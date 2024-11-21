const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
require("./Db/index.js"); // Make sure your DB connection is correct
require('dotenv').config(); // Ensure you have your .env file for sensitive info
//const AuthRoute = require("./Routes/routes"); // Authentication route file
// const ProductRouter = require("./Routes/Product"); // Uncomment if you have a ProductRouter

const router = require("./Routes/routes"); // Import the controller for adding airdrops

const PORT = process.env.PORT; 

// Middleware setup
app.use(cors())

 // Enable CORS for all routes (you can configure it further if needed)
app.use(bodyParser.json()); // Middleware to parse JSON data from requests

// Route definitions
app.use("/api/v1", router); // Define the route for adding a new airdrop

// Use Auth routes with a proper prefix
//app.use("/api/v1", AuthRoute); // Correctly prefixed route for auth APIs

// Uncomment the following line if you have a ProductRouter


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
