import express from 'express';
const router = express();
import validator from 'validator'

// get all comments with post id as a parameter
router.get('/viewAll/:id', async function (req, res) {
    try {
        const Comment = req.db.Comment;
        const comments = await Comment.find({post: req.params.id}).sort({date: -1});
        res.send({
            "comments": comments,
            'success': true
        });
    } catch {
        (err) => {
            res.send({
                "success": false,
                "message": "Error getting comments"
            });
            return;
        }
    }
})
// create a comment with post id as a parameter
router.post('/create/:id', async function (req, res) {
    const Comment = req.db.Comment;
    const newComment = new Comment({
        content: req.body.content,
        post: req.params.id,
        bgColor: req.body.bgColor,
        author: req.body.author
    })
    try {
        await newComment.save();
        
        res.send({
            "success": true,
            "message": "Comment created"
        });
    } catch {
        (err) => {
            res.send({
                "success": false,
                "message": "Error creating comment",
                "error": err
            });
            return;
        }
    }
})
router.get('/search', async (req, res) => {
  const query = req.query.q; 
  const sanitizedQuery = validator.escape(query);
  try {
    const Comment = req.db.Comment;
    const comments = await Comment.find({ content: { $regex: sanitizedQuery, $options: 'i' } }).sort({ date: -1 });
    res.send({
        'success': true,
        'comments': comments
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
