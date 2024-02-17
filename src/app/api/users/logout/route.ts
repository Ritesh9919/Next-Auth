
import {NextResponse} from 'next/server'
import {ApiResponse} from '@/helpers/ApiResponse'
import { ApiError } from "@/helpers/ApiError";


export async function GET() {
    try {
        const response = NextResponse.json(new ApiResponse(200,{},'Logout successfully'))
        response.cookies.set('token', "", {
            httpOnly:true,
        })
        return response
    } catch (error:any) {
        throw new ApiError(500, error.message);
    }
   
}
