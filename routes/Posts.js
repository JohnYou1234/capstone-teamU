import express from 'express';
const app  = express();
app.get('/viewAll', async function (req, res) {
    try {
        const Post = req.db.Post;
        const posts = await Post.find().sort({date: -1});
        res.send({
            "posts": posts,
            'success': true
        });
    } catch {
        (err) => {
            res.send({
                "success": false,
                "message": "Error getting posts",
                "err": err
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
        type: req.body.type,
        board: req.body.board,
        boardName: req.body.boardName
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

// find post by id
app.get('/viewOne/:id', async function (req, res) {
    const Post = req.db.Post;
    try {
        const post = await Post.findById(req.params.id);
        res.send({
            "post": post,
            "success": true
        });
    } catch {
        (err) => {
            res.send({
                "success": false,
                "message": "Error getting post"
            });
            return;
        }
    }
})

// get all posts with certain board id
app.get('/viewAllPosts/:id', async function (req, res) {
    try {
        const Post = req.db.Post;
        const posts = await Post.find({board: req.params.id}).sort({date: -1});
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
});
export default app;