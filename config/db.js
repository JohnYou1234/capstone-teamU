import mongoose from 'mongoose';
// import env from './env.js';
import dotenv from 'dotenv';
dotenv.config();
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
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        category: String,
        type: { type: String, default: 'text' },
        board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
        boardName: String,
        date: { type: Date, default: Date.now }
    });   

    const CommentSchema = new mongoose.Schema({
        content: String,
        bgColor: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
    });

    const BoardSchema = new mongoose.Schema({
        name: String,
        description: String,
        date: { type: Date, default: Date.now }
    });
    const UserSchema = new mongoose.Schema({
        email: String,
        password: String,
        boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
        savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        savedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    });
    
    const VerificationSchema = new mongoose.Schema({
        email: String,
        code: String,
        password: String,
        expiresAt: Date
    });
    
    const ReportSchema = new mongoose.Schema({
        type: String,
        text: String,
        date: { type: Date, default: Date.now },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    });
    db.User = mongoose.model('User', UserSchema);
    db.Verification = mongoose.model('Verification', VerificationSchema);
    db.Post = mongoose.model('Post', PostSchema);
    db.Comment = mongoose.model('Comment', CommentSchema);
    db.Board = mongoose.model('Board', BoardSchema);
    db.Report = mongoose.model('Report', ReportSchema);
    console.log("Created DB Schemas and Models");
}

export default db;