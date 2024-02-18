import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import User from '@/models/user-model'
import {connect} from '@/dbConfig/dbConfig'


connect()

export const sendMail = async({email,emailType,userId}:any) => {
     // create token
     const hashedToken = await bcrypt.hash(userId.toString(),10)

     if(emailType === 'VERIFY') {
        await User.findByIdAndUpdate(
            userId,
            {verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000}
        )
     }else if(emailType === 'RESET') {
        await User.findByIdAndUpdate(
            userId,
            {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now() + 3600000}
        )
     }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASSWORD
            }
          });

          const mailOptions = {
            from:'riteshkumar411552@gmail.com',
            to:email,
            subject:emailType === 'VERIFY' ? 'Varify you email':'Reset your password',
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY'?'varify you email':'reset your password'} or copy and paste link below your browser <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</br> </p>`
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    
}