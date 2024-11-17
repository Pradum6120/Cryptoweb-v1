const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },

    email:{
        type:String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required:true,
    },
     role:{
        type: String,
        enum:['admin', 'user'],
        default: 'user'
     },
     isPinned:{
        type: Boolean,
        default: false
     },

     pinned:[
        {
            airdrop:{
                type: mongoose.Schema.Types.ObjectId,
                ref: " AirdropModel",
                required: true
            }
        }
     ],
     pinnedCount:{
        type: Number,
        default:0
     }

},{timestamps: true}); 

const UserModel = mongoose.model("singnupuser", UserSchema);
module.exports = UserModel;