const jwt = require('jsonwebtoken');
const secret = "123456789";


const jwtAuthMiddleware = (req,res,next)=>{

    //extract the jwt token from the request headers
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: "token not found",})
     // bearer abc123xyz456
    const token = req.headers.authorization.split(' ')[1];   

    if(!token) return res.status().json({error: "Unauthorized: no token found"});

try {
     //  verify jwt
    const decoded = jwt.verify(token, secret)

    // attach user information to the request object
    req.user = decoded
   next();   

} catch (error) {

    console.log(error);
    res.status(401).json({
        error: 'invalid token'
    })
    
}



}


const GenerateJsonWebToken = (payload ) => {
    try {
      return jwt.sign(payload, secret);
    } catch (error) {
      console.error('Error generating JWT:', error);
      throw new Error('Failed to generate token');
    }
  };
  
  module.exports = {GenerateJsonWebToken , jwtAuthMiddleware}