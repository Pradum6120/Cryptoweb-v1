const { signupValidation, loginValidation } = require("../Middlewares/checking");
const { login, signup, currentuser, users } = require("../Controllers/Authentication");
const { add, update, getallairdrop, getairdropbyid, deleteairdropbyid, getallairdropbyadmin, deleteuserbyid } = require("../Controllers/Airdrops");
const { CloudinaryFileUploder } = require("../Middlewares/Cloudinary.js");
const { GenerateJsonWebToken, jwtAuthMiddleware } = require("../Middlewares/jwt.js");
const UserModel = require("../Models/User.models"); // Ensure UserModel is imported
const router = require("express").Router();
const AirdropModel = require("../Models/Airdrop.models");

// Authentication routes
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);


 // uplaod on cloudinary
cloudinary = CloudinaryFileUploder.fields([
    { name: "profileimage", maxCount: 1 },
    { name: "blogimage1", maxCount: 1 }
 ]), async (req, res, next) => {
    try {
        // Check if files are uploaded properly
        if (!req.files || !req.files.profileimage || !req.files.blogimage1) {
            return res.status(400).json({
                message: "Failed to upload files. Please provide profileimage and blogimage1."
            });
        }
 
        // Retrieve file URLs
        const profileImageUrl = req.files.profileimage[0].path;
        const blogImage1Url = req.files.blogimage1[0].path;
 

        // Log files for debugging (you can remove this in production)
        console.log('Uploaded files: ', profileImageUrl, blogImage1Url);
 
        // Pass file URLs to the next middleware (add controller)
        req.body.profileimage = profileImageUrl;
        req.body.blogimage1 = blogImage1Url;
 
        next();  // Call the `add` function
    } catch (error) {
        console.error('Error handling file uploads:', error);
        return res.status(500).json({
            message: "File upload failed",
            error: error.message
        });
    }
 }

 
// Admin role check middleware
const isAdmin = async (req, res, next) => {
   try {
       const user = await UserModel.findById(req.user.id);
       if (!user || user.role !== 'admin') {
           return res.status(403).json({
               message: "You do not have admin role",
               data: req.user.id
           });
       }
       next(); // User is an admin, continue to the next middleware
   } catch (error) {
       console.error('Error while checking admin role:', error);
       res.status(500).json({
           message: 'Internal server error while verifying admin role.'
       });
   }
};

// for getting all users by admin
router.get("/users", jwtAuthMiddleware, isAdmin , users )

// for getting all airdrops - admin route
  router.get("/allairdropadmin",jwtAuthMiddleware, isAdmin ,getallairdropbyadmin)
 
// currentuser 
router.get("/currentuser", jwtAuthMiddleware, currentuser )

// Delete airdrop by ID
router.delete('/:id', jwtAuthMiddleware, isAdmin, deleteairdropbyid);

// Delete user by ID
router.delete('/deleteuser/:id', jwtAuthMiddleware, isAdmin, deleteuserbyid);



router.post("/addtesting",jwtAuthMiddleware, isAdmin,add);

// Add route with multiple image uploads
router.post("/add",jwtAuthMiddleware, isAdmin, cloudinary,add);  // Now call the `add` function to handle the rest of the request

// Route for showing all airdrops
router.get("/", getallairdrop);

// For updating airdrop
router.put("/:id", jwtAuthMiddleware, isAdmin, CloudinaryFileUploder.fields([
   { name: "profileimage", maxCount: 1 },
   { name: "blogimage1", maxCount: 1 }
]), async (req, res, next) => {
   try {
       let profileimageurl = req.body.profileimage;
       let blogimageurl = req.body.blogimage1;

       // Handle image file uploads
       if (req.files) {
           if (req.files.profileimage) {
               profileimageurl = req.files.profileimage[0].path;
           }
           if (req.files.blogimage1) {
               blogimageurl = req.files.blogimage1[0].path;
           }
       }

       req.body.profileimage = profileimageurl;
       req.body.blogimage1 = blogimageurl;

       next();  // Call the `update` function
   } catch (error) {
       console.error('Error handling image upload in update:', error);
       return res.status(500).json({
           message: "Error processing image uploads in update.",
           error: error.message
       });
   }
}, update);

// Get a specific airdrop by ID
router.get('/:id', getairdropbyid);




//let's start pinned 

router.get("/pinned/:id", jwtAuthMiddleware, async(req,res)=>{
          // airdropid 
          const airdropid = req.params.id 
          // user id getting by jswtauthmiddleware 
          const userid = req.user.id
    try {
       
        const airdrop = await AirdropModel.findById(airdropid);
        if(!airdrop){
            console.log(airdrop)
            return res.status(404).json({message:'Candidate not found'})
        }

        const user = await UserModel.findById(userid)
        if(!user){
            return res.status(404).json({message:'user not found'}) 
        }

        if(user.role === 'admin'){
            return res.status(404).json({message:'admin cannot pinned'})
        }
        if(user.isPinned){
            return res.status(404).json({message:'you already pinned'}) 
        }

        
        // push the pinned user in airdrops and also push pinned airdrops in user
        airdrop.pinned.push({user:userid})
        airdrop.pinnedCount++
        await airdrop.save()
        
       user.pinned.push({airdrop:airdropid})
       user.pinnedCount++
       await user.save();

       return res.status().json({message:"pinned successfully",
        success: true
       })


    } catch (error) {
        res.status(500).json({
            message: "failed to pinned! internal server error",
            success: false,
            error: error.message
        })
    }
    
    
} )

// total pinned count of each airdrop
router.get("/pinned/count" , async (req,res)=>{
    try {
         const airdrop = await AirdropModel.find()

         const PinnedRecord = airdrop.map((air)=>{
               return {
                airdrop : air.title,
                totalpinnedby : air.pinnedCount
               }
         })

         return res.status(200).json(PinnedRecord )
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "unable to fetch pinned count",
            error: error.message
        })
        
    }

})




module.exports = router;



