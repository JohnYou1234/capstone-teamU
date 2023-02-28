import express from 'express';

const app  = express();
app.get('/viewAll', async function (req, res) {
    try {
        const Post = req.db.Post;
        // sort by date latest to earliest
        const posts = await Post.find().sort({date: -1});
        res.send({
            "posts": posts,
            'success': true
        });
    } catch {
        (err) => {
            res.send({
                "success": false,
                "message": "Error getting posts"
            });
            return;
        }
    }
})

app.post('/create', async function (req, res) {
    const Post = req.db.Post;
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        bgColor: req.body.bgColor,
        author: req.body.author,
        category: req.body.category,
        type: req.body.type
    })
    try {
        await newPost.save();
        res.send({
            "success": true,
            "message": "Post created"
        });

    } catch {
        (err) => {
            res.send({
                "success": false,
                "message": "Error creating post",
                "error": err
            });
            return;
        }
    }
})

export default app;