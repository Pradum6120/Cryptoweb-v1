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
router.post("/add",jwtAuthMiddleware, isAdmin,CloudinaryFileUploder.fields([
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
 },add);  // Now call the `add` function to handle the rest of the request

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


// testing  




// get current user pinned post 

router.get("/post/pinned", jwtAuthMiddleware, async (req, res) => {
    try {
      const userdetail = req.user; // Get user info from JWT token
      console.log("userdetail",userdetail)
  
      // Check if the user ID is valid (useful only if you're unsure of the format)
      
      // Find the user by ID and populate 'pinned.airdrop' to get full details of pinned airdrops
      const userinfo = await UserModel.findById(userdetail.id).populate('pinned.airdrop')
      console.log("userinfo", userinfo)
  
      if (!userinfo) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return pinned posts with populated airdrop details
      return res.status(200).json({
        success: true,
        pinnedPosts: userinfo.pinned,  // This will now contain full airdrop data
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Unable to fetch pinned posts',
        error: error.message,
      });
    }
  });
  
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
        

        // checking if user already pinned the post
        const isAlreadyPinned = user.pinned.some(pinnedPost => pinnedPost.airdrop.toString() === airdropid )

        if(isAlreadyPinned) {
            user.pinned = user.pinned.filter(pinnedPost => pinnedPost.airdrop.toString() !== airdropid);
            airdrop.pinnedCount--;
            airdrop.pinned = airdrop.pinned.filter(pinnedUser => pinnedUser.user.toString() !== userid);
            await Promise.all([user.save(), airdrop.save()]);
            return res.status(200).json({ message: 'Airdrop unpinned successfully', success: true });
        }

        else{

       
        // push the pinned user in airdrops and also push pinned airdrops in user
        airdrop.pinned.push({user:user})
        airdrop.pinnedCount++
        user.pinned.push({airdrop:airdrop})
         user.pinnedCount++
         await Promise.all([user.save(), airdrop.save()]);
         return res.status(200).json({ message: 'Airdrop pinned successfully', success: true });
    }


    } catch (error) {
        res.status(500).json({
            message: "failed to pinned! internal server error",
            success: false,
            error: error.message
        })
    }
    
    
} )

// total pinned count of each airdrop
router.get("/yo/count" , async (req,res)=>{
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

//manage to unpinned post

router.get("/unpinned/:id", jwtAuthMiddleware, async(req,res)=>{
             const airdropid = req.params.id
             const userid = req.user.id

             try {
                const airdrop = await AirdropModel.findById(airdropid)
                const user = await UserModel.findById(userid)

                if(!airdrop){
                    return res.status(404).json({message:'post not found'})
                }
                
                if(!user){
                    return res.status(404).json({message:'user not found'})
                }

                const alreadypinned = user.pinned.some(pinnedPost => pinnedPost.airdrop.toString() === airdropid)
                if(alreadypinned) {
                   user.pinned = user.pinned.filter(pinnedPost => pinnedPost.airdrop.toString() !== airdropid)
                   airdrop.pinnedCount--;
                   airdrop.pinned = airdrop.pinned.filter(pinnedUser => pinnedUser.user.toString() !== userid);
                    await Promise.all([user.save(), airdrop.save()]);
                   return res.status(200).json({ message: 'Airdrop unpinned successfully', success: true });
                }
                else{
                    return res.status(200).json({ message: 'Airdrop was not pinned initially ', success: true }); 
                }

             } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: "unable to unpinned post",
                    error: error.message
                })
             }
})


// manage like on post & which user like post

router.get("/liked/:id", jwtAuthMiddleware, async(req,res)=>{
    const airdropid = req.params.id 
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
  

  // checking if user already liked the post
  const isAlreadyLiked = airdrop.liked.some(likedPost => likedPost.user.toString() === userid )

  if(isAlreadyLiked) {

    airdrop.liked = airdrop.liked.filter(likedPost => likedPost.user.toString() !== userid);
    airdrop.likedCount--;
    await airdrop.save();

    return res.status(200).json({ message: "Post unliked successfully", success: true });

  } else{

    // push the Liked user in airdrops and also increase like count
     airdrop.liked.push({user:user})
     airdrop.likedCount++
      await airdrop.save()


   return res.status(200).json({message:"Liked successfully",
   success: true
 })
}

} catch (error) {
  res.status(500).json({
      message: "failed to Liked! internal server error",
      success: false,
      error: error.message
  })
}


} )

// manage like count

router.get("/likes/count" , async (req,res)=>{
    try {
         const airdrop = await AirdropModel.find()

         const LikedRecord = airdrop.map((air)=>{
               return {
                airdrop : air.title,
                totalLikedby : air.likedCount
               }
         })

         return res.status(200).json(LikedRecord )
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "unable to likes count",
            error: error.message
        })
        
    }

})





module.exports = router;



