import express from 'express';
const router = express();
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
        bgColor: req.body.bgColor
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
export default router;
