const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const UserModel = require("../Models/User.models.js")
const AirdropModel = require("../Models/Airdrop.models.js")
const {GenerateJsonWebToken}= require("../Middlewares/jwt.js")


const signup = async (req,res)=> {
   
    try {
        const{name,email,password,role}= req.body;
         
        const user = await UserModel.findOne({email})
        // if user already register
        if(user){
            return res.status(409)
            .json({
                message:"user is already registered, please login",
                success:false
            })
        }


        //create user
    
        const usermodel = new UserModel({name, email, password, role})
    
        usermodel.password = await bcrypt.hash(password,10)
       
        const response =  await usermodel.save()
        

         const payload = {
            id : response.id
         }

         const token = GenerateJsonWebToken(payload);

         
    
        res.status(200)
        .json({
            message: "registerd suceesfully",
            success: true,
            user:response,
            token: token
        })
    } catch (error) {
        res.status(500)
        .json({
            message:" error while register please try again",
            success:false
        })

        
    }
}

// for login
const login = async (req,res)=>{
    try {
        const {email, password} = req.body

        const user = await UserModel.findOne({email});
        if(!user){
         return res.status(403)
          .json({
            message: "Email or password is wrong!",
            success: false
          })
        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        if(!passwordCheck){
          return res.status(403)
           .json({
            message: "password is envalid",
            success:false
           })
        }


        const payload = {
            id : user.id
         }

         const token = GenerateJsonWebToken(payload);
    


    return res.status(200)
    .json({
        message: "login successfully",
        success: true, 
        email,
        name:user.name,
        jwt: token
    })




    } catch (error) {
      return  res.status(500).json({
            error: error.message
        })
        
    }

}

const currentuser = async (req,res)=>{
     try {
        const user =  req.user
        const userdata = await UserModel.findById(user.id)

        res.status(200).json({
          user: userdata
        })
     } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            error: error.message
        })
     }
}


const users = async (req,res)=>{
    try {
       const user =  req.user
       const usersdata = await UserModel.find()

       res.status(200).json({
         user: usersdata
       })
    } catch (error) {
       res.status(500).json({
           message: "something went wrong",
           error: error.message
       })
    }
}






const add = async (req,res)=>{
    try {
         const {title, description, twitterlink, discrordlink, profileimage, content1, url1, blogimage1,content2, url2, blogimage2,content3, url3, blogimage3} = req.body
         
         const airdrop = new AirdropModel({title, description, twitterlink, discrordlink, profileimage, content1, url1, blogimage1,content2, url2, blogimage2,content3, url3, blogimage3,})
         await airdrop.save()
         res.status(200).json({
            message: " airdrops add successfully",
            sc
         })
    } catch (error) {
        res.status(404).json({
            message: " failed to add",
            success:false
        })
    }

}

module.exports = {
    signup,
    login,
    add,
    currentuser,
    users
}
  