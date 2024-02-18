import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/user-model";
import {ApiError} from '@/helpers/ApiError'
import {ApiResponse} from '@/helpers/ApiResponse'
import {NextRequest,NextResponse} from 'next/server'

connect()

export async function POST(request:NextRequest) {
  try {
    const reqBody = await request.json()
    const {token} = reqBody
    
  
    const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
    

    if(!user) {
        throw new ApiError(400, 'Invalid token')
    }

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()

    return NextResponse.json(new ApiResponse(200,{},'Email varified successfully'))

  } catch (error:any) {
    throw new ApiError(500,error.message)
  }
}