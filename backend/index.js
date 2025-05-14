const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const connection = require('./Db/index'); // Import the DB connection
require('dotenv').config(); // Ensure you have your .env file for sensitive info
const router = require("./Routes/routes"); // Import the controller for adding airdrops
const PORT = process.env.PORT; 
const path = require('path');

connection()

const _dirname = path.resolve();


// Middleware 
app.use(cors())
app.use(bodyParser.json()); 
app.use("/api/v1", router); 

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*',(_,res)=>{
     res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'))
})


//server
app.listen(PORT, () => {
    (`Server running on port ${PORT}`);
});
