const { signupValidation, loginValidation } = require("../Middlewares/checking");
const { login, signup } = require("../Controllers/Authentication");
const { add ,update, getallairdrop, getairdropbyid, deleteairdropbyid} = require("../Controllers/Airdrops");
const { CloudinaryFileUploder } = require("../Middlewares/Cloudinary.js");

const router = require("express").Router();

// Authentication routes
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

// check user is admin or not

const checkadmin = async (userid) => {
   try{
    const user = await UserModel.findById(userid);

    if(user.role === 'admin') {
        return true;
    }
}catch(error){
    return false;
}

}

// Add route with multiple image uploads
router.post("/add", CloudinaryFileUploder.fields([
    {
        name: "profileimage",
        maxCount:1
    },
    {
        name: "blogimage1",
        maxCount:1  
    }
]),

(req, res, next) => {   // Handle the file upload response
    try {
        // Check if files are uploaded properly
        if (!req.files || !req.files.profileimage || !req.files.blogimage1) {
            return res.status(400).json({
                message: "Failed to upload files, please provide profileimage and blogimage1."
            });
        }

        // If files exist, retrieve their URLs
        const profileImageUrl = req.files.profileimage[0].path;
        const blogImage1Url = req.files.blogimage1[0].path;
       // const blogImage2Url = req.files.blogimage2[0].path;
       // const blogImage3Url = req.files.blogimage3[0].path;
        
        console.log('Uploaded files: ', profileImageUrl, blogImage1Url);
        
        // You can pass the image URLs to the next middleware (the `add` controller function)
        req.body.profileimage = profileImageUrl;
        req.body.blogimage1 = blogImage1Url;

        // Move to the next middleware, which is the `add` function
        next();
    } catch (error) {
        return res.status(500).json({
            message: "File upload failed",
            error: error.message
        });
    }
},

add    // Now call the `add` function to handle the rest of the request
);

// for showing all airdrops
router.get("/" , getallairdrop)


//for update

router.put("/:id", CloudinaryFileUploder.fields([
    {
        name: "profileimage",
        maxCount:1
    },
    {
        name: "blogimage1",
        maxCount:1  
    }
]),

(req,res,next)=>{

try {

    let profileimageurl = req.body.profileimage;
    let blogimageurl = req.body.blogimage1;

    if(req.files){
     if(req.files.profileimage ){
        profileimageurl = req.files.profileimage[0].path 
     }
     if(req.files.blogimage1 ){
        blogimageurl = req.files.blogimage1[0].path;
     }
    }
    
    // assign to req.body 
    req.body.profileimage = profileimageurl
    req.body.blogimage1 = blogimageurl 

    next()
    
} catch (error) {
    
}


}






,update)




router.get('/:id', getairdropbyid)

// for deleting

router.delete('/:id', deleteairdropbyid)


module.exports = router;
