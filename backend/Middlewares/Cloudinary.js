const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "dg0cqbvze",
  api_key: process.env.CLOUDINARY_API_KEY || "664789112495489",
  api_secret: process.env.CLOUDINARY_API_SECRET || "5yMivlkOVxMa0Loo1ak-5RbHYbY"
});

// Cloudinary Storage Setup with Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'airdrop', // The folder where files will be stored in Cloudinary
    formate: async (req, file) => 'png', // Convert files to PNG format (you can remove this to allow auto format detection by Cloudinary)
    public_id: (req, file) => file.originalname.split('.')[0] + '', // Set the public ID (file name without extension)
  },
});

// Multer middleware for Cloudinary upload
const CloudinaryFileUploder = multer({ storage: storage });

// Export the middleware for use in routes
module.exports = {
  CloudinaryFileUploder
};
