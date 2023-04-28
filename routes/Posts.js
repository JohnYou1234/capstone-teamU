import express from 'express';
const app  = express();
import validator from 'validator'

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

app.get('/viewAllGeneral', async function (req, res) {
    try {
        const Post = req.db.Post;
        const posts = await Post.find({
            $or: [
                {optOutGen: {$exists: false}},
                {optOutGen: false}
            ]
        }).sort({date: -1});
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
});


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
        boardName: req.body.boardName,
        optOutGen: req.body.optOutGen
    })
    try {
        await newPost.save();
        res.send({
            "success": true,
            "message": "Post created"
        });

    } catch {
        (err) => {
            console.log(err);
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

app.get('/search', async (req, res) => {
    const query = req.query.q;
    const sanitizedQuery = validator.escape(query);
    try {
      const Post = req.db.Post;
  
      const posts = await Post.find({
        $or: [
          { title: { $regex: sanitizedQuery, $options: 'i' } },
          { content: { $regex: sanitizedQuery, $options: 'i' }, $or: [{ type: 'text' }, { type: { $exists: false } }] },
        ],
      })
      .sort({ date: -1 });
  
      res.send({
        success: true,
        posts,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
export default app;