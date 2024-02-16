import axios from 'axios'
import User from '@/models/user-model'
import {useRouter} from 'next/navigation'
import {toast} from 'react-hot-toast'
import {NextRequest,NextResponse} from 'next/server'
import { ApiError } from '@/helpers/ApiError'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {generateVarifyToken} from '@/helpers/generateVarifyToken'
import { ApiResponse } from '@/helpers/ApiResponse'


export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        if(!email || !password) {
            throw new ApiError(400, 'Both fields are required')
        }
       
        const user = await User.findOne({email})
        if(!user) {
            throw new ApiError(404, 'User does not exist')
        }

       const isPasswordCurrect = await bcrypt.compare(password, user.password)
       if(!isPasswordCurrect) {
        throw new ApiError(401, 'Invalid Credential')
       }

       // generate token
       const token = generateVarifyToken(user._id)

       const response = NextResponse.json(new ApiResponse(200,{user},'Login successfully'))

       response.cookies.set('token', token, {httpOnly:true})
       return response


    } catch (error) {
        throw new ApiError(500, 'Internal server error');
    }
}