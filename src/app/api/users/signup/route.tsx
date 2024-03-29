import { connect } from "@/dbConfig/dbConfig";
import bcrypt from 'bcryptjs';
import User from "@/models/user-model";
import {NextResponse,NextRequest} from 'next/server';
import { ApiError } from "@/helpers/ApiError";
import {ApiResponse} from '@/helpers/ApiResponse';
import { sendMail } from "@/helpers/mailer";




connect()


export async function POST(request:NextRequest) {
  try {
    const reqBody = await request.json()
  const {username,email,password} = reqBody;

  if(!username || !email || !password) {
     throw new ApiError(400, 'All fields are required');
  }

  const user = await User.findOne({email})
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
 
  // Send varification email
  await sendMail({email, emailType:'VERIFY', userId:savedUser._id})

  return NextResponse.json(new ApiResponse(201,savedUser,'Signup successfull'))
  } catch (error:any) {
    return new ApiError(500, error.message);
  }
  


  
}