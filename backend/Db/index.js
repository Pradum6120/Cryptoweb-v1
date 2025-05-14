const mongoose = require('mongoose')

const connection = async ()=>{
     try {
      await mongoose.connect(`${process.env.MONGODB_URI}`)
     } catch (error) {

      console.log("unable to connect mongodb", error)
     }
}

module.exports = connection