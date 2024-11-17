//get all data of airdrop

const getallairdrop = async (req,res)=> {
    try {
      const airdrops = await AirdropModel.find({}) 
      res.status(200).json({
        message: "All Airdrops",
        success: true,
        data: airdrops
      })   
    } catch (err) {
        res.status(500).json({
            message: "internal server error",
            success: false,
            error: err.message
        })
        
    }

}