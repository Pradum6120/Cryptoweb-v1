const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    }
  });
  

  const reviewSchema = new Schema({
    rating: { 
        type: Number, 
        required:true },
    comment: { 
        type: String, 
        required: true 
    },
    author: { 
        type: Schema.Types.ObjectId,
         ref: 'Author' } // Reference to Author
  });

  const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author' }, // Reference to Author
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }] // Array of references to Review
  });

const Author = mongoose.model('Author', authorSchema);
const Review = mongoose.model('Review', reviewSchema);
const Book = mongoose.model('Book', bookSchema);



async function getBookWithNestedPopulate() {
    try {
      const book = await Book.findOne({ title: 'MongoDB for Beginners' })
        .populate({
          path: 'author',                // Populate the 'author' field in the book
          select: 'name'                 // Only select the 'name' field
        })
        .populate({
          path: 'reviews',               // Populate the 'reviews' field with Review documents
          populate: {                     // Nested populate
            path: 'author',              // Inside each review, populate the 'author' field (who wrote the review)
            select: 'name'               // Only select the 'name' of the review's author
          }
        });
  
    } catch (err) {
      console.error(err);
    }
  }
  
  getBookWithNestedPopulate();


  //nested populate
  