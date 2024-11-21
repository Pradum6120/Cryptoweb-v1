const mongoose = require('mongoose')
const mongo_uri = "mongodb+srv://pradum:pradum6120@pradum.cq0bj.mongodb.net/pradum?retryWrites=true&w=majority&appName=pradum"


//const mongo_uri = process.env.MONGO_URI; 
mongoose.connect(mongo_uri)
.then(()=>{
  console.log("mongodb connected successfully")
}).catch((error)=>{
    console.log("unable to connect mongodb", error)
})