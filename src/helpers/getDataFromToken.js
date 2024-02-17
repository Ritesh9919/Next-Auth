
import jwt from 'jsonwebtoken'
import { ApiError } from './ApiError';
import {NextRequest} from 'next/server'


export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get('token')?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.userId;
    } catch (error) {
        throw new ApiError(401,error.message);
    }
    


}