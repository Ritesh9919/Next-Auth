import { connect } from "@/dbConfig/dbConfig";
import bcrypt from 'bcryptjs';
import User from "@/models/user-model";
import {NextResponse,NextRequest} from 'next/server';
import { ApiError } from "@/helpers/ApiError";
import {ApiResponse} from '@/helpers/ApiResponse';




connect()


export async function POST(request:NextRequest) {
  const reqBody = await request.json()
  const {username,email,password} = reqBody;

  if(!username || !email || !password) {
     throw new ApiError(400, 'All fields are required');
  }

  const user = await User.findOne({username})
  if(user) {
    throw new ApiError(400,'User already exist')
  }

  const hashedPassword = await bcrypt.hash(password,10)
  const newUser = new User({
    username,
    email,
    password:hashedPassword
  })

  const savedUser = await newUser.save()

  return NextResponse.json(new ApiResponse(201,savedUser,'Signup successfull'))


  
}