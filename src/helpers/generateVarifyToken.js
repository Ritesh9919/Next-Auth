
import jwt from 'jsonwebtoken'

export const  generateVarifyToken = (userId)=> {
   const token = jwt.sign({userId:userId}, process.env.TOKEN_SECRET,{expiresIn:'1d'});
   return token;
}