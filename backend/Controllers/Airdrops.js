const AirdropModel = require("../Models/Airdrop.models.js");
const UserModel = require("../Models/User.models.js")

const add = async (req, res) => {
    try {
         const body = req.body;
         ("incoming data", body);

         // Create a new Airdrop object
        let airdrop = new AirdropModel(body);

        // Save the new airdrop to the database
        await airdrop.save();

        // Send response after saving to the database
        res.status(200).json({
            message: "Airdrop added successfully",
            success: true,
            data: airdrop
        });
    } catch (error) {
        console.error("Error occurred:", error.message); // Log the error for debugging

        // Send error response
        res.status(500).json({
            message: "Failed to add airdrop",
            success: false,
            error: error.message // Include the error message for clarity
        });
    }
};


// getting all airdrops by admin

 const getallairdropbyadmin = async (req,res) => {

       try {
            const allairdropadmin = await AirdropModel.find()
            res.status(200).json({
                message: "All Airdrops",
                success: true,
                data: {
                    airdrop:allairdropadmin
                    
        
                }
              })    
           
       }
        catch (error) {
        (error)
        res.status(500).json({
            message:"something went wrong",
            error: error.message
        })
        
       }
 }


const getallairdrop = async (req,res)=> {
    try {
        let {page, limit, search} = req.query;

        //parseInt(page) converts the page string into an integer.
        page = Math.max(1, parseInt(page)) || 1;

        //Math.max(1, parseInt(page)) ensures that if the page value is less than 1 or not provided, it defaults to 1.
        limit = Math.max(1, parseInt(limit)) || 5;
        
        const skip = (page-1)* limit; // 1-1 =0 *5 =0 // 2-1=1*5=5
    

        let searchcriteria = {};
        if(search){
            searchcriteria = {
                title: {
                    $regex: search,
                    $options:'i' // case insensitive
                }

           }
        }
     const totalAirdrop = await  AirdropModel.countDocuments(searchcriteria)

      const airdrops = await AirdropModel.find(searchcriteria) 
      .skip(skip)
      .limit(limit)
      .sort({updatedAt: -1 })

      const totalPages = Math.ceil(totalAirdrop/limit)
      res.status(200).json({
        message: "All Airdrops",
        success: true,
        data: {
            employees: airdrops,
            pagination:{
                totalAirdrop ,
                currentpage: page,
                totalPages,
                pageSize: limit
            }

        }
      })   

    } catch (err) {
        res.status(500).json({
            message: "internal server error",
            success: false,
            error: err.message
        })
        
    }

}

// getting aidrop by id

const getairdropbyid = async(req,res)=>{
    try {
        const { id } = req.params 
        const airdrop = await AirdropModel.findOne({_id : id}) 
        res.status(200)
        .json({
            message: "get airdrop by id",
            success: true,
            data: airdrop
          })   
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            success: false,
            error: error.message
        })
    }

}


// delete airdrop by admin control

const deleteairdropbyid = async(req,res)=>{
    try {
        const { id } = req.params
        const airdrop = await AirdropModel.findByIdAndDelete({_id : id}) 
        res.status(200)
        .json({
            message: "deleted successfully",
            success: true,
          })   
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            success: false,
            error: error.message
        })
    }

}

// delete user by admin control

const deleteuserbyid = async (req,res)=>{
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete({_id : id}) 
        res.status(200)
        .json({
            message: "delete successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            success: false,
            error: error.message
        })
    }
}






// update any airdrop by id

const update = async (req, res) => {
    try {
         const {title, description, twitterlink, discordlink, profileimage, content1, url1, blogimage1} = req.body;
         const {id} = req.params;
        
         let updatedata = {
            title, description, twitterlink, discordlink, profileimage, content1, url1, blogimage1 
         }

         const updateairdrop = await AirdropModel.findByIdAndUpdate(
            id, 
            updatedata, 
            {new: true}
         )
         if( !updateairdrop){
            return res.status(404).json({
                message: 'airdrop not found'
            })
         }

        // Send response after saving to the database
        res.status(200).json({
            message: "Airdrop updated",
            success: true,
            data : updateairdrop
        });
    } catch (error) {
        console.error("Error occurred:", error); // Log the error for debugging

        // Send error response
        res.status(500).json({
            message: "Failed to update",
            success: false,
            error: error.message // Include the error message for clarity
        });
    }
};




module.exports = {
    add, getallairdrop, getairdropbyid, deleteairdropbyid, update, getallairdropbyadmin, deleteuserbyid
};
