const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AirdropSchema = new Schema({
    title:{
        type: String,
        required: true
        
    },

    description:{
       type: String,
       required: true
    },

    twitterlink:{
      type: String,
      required: true
    
    },

    discordlink:{
        type: String,
        required: true
    },

    profileimage:{
        type: String,
    
    },

    content1:{
       type:String,
    

    },

    url1:{
        type: String,
        
    },
    blogimage1:{
        type: String,
    },
    content2:{
        type:String,
 
     },
 
     url2:{
         type: String,
     },
     blogimage2:{
         type: String,
     },
     content3:{
        type:String,
     
     },
 
     url3:{
         type: String,
         
     },
     blogimage3:{
         type: String,
        
     },

     pinned:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            }
        }
     ],
     pinnedCount:{
        type: Number,
        default:0
     }


},{timestamps: true}); 

const AirdropModel = mongoose.model("Airdroplist", AirdropSchema );
module.exports = AirdropModel;