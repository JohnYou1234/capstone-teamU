import mongoose from 'mongoose';
const PostSchema = '../models/Post.js';
// Connect to database
dbConnect().catch((err) => console.log(err));
let db = {}
// Connect to MongoDB
async function dbConnect() {
    await mongoose.connect(process.env.MONGODB_URL)
    // Log successful connection
    console.log("Successfully connected to the database!")
    const PostSchema = new mongoose.Schema({
        title: String,
        content: String,
        bgColor: String,
        author: String,
        category: String,
        type: String,
        date: { type: Date, default: Date.now }
    });   
    db.Post = mongoose.model('Posts', PostSchema)
    console.log("Created DB Schemas and Models")
}

export default db;