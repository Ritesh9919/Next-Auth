import User from "@/models/user-model";
import {ApiError} from '@/helpers/ApiError'
import {ApiResponse} from '@/helpers/ApiResponse'
import {NextRequest,NextResponse} from 'next/server'
import {getDataFromToken} from '@/helpers/getDataFromToken'

export async function GET(request:NextRequest) {
    try {
        const userId = getDataFromToken(request)
        const user = await User.findById(userId)
        if(!user) {
            throw new ApiError(404, 'User does not exist')
        }
        return NextResponse.json(new ApiResponse(200,{user},'user fetched successfully'))

    } catch (error:any) {
        throw new ApiError(500, error.message)
    }
}
