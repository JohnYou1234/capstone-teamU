import express from 'express';
const router = express.Router();
import crypto from 'crypto';
import nodemailer from 'nodemailer';
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const Verification = req.db.Verification;
    const User = req.db.User;
    if (!email.endsWith('@uw.edu')) {
        return res.status(400).send({ success: false, message: 'Invalid email address' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).send({ success: false, message: 'Email already registered' });
    }

    const code = crypto.randomBytes(4).toString('hex');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const verification = new Verification({ email, password, code, expiresAt });
    await verification.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'howlerverify@gmail.com',
          pass: 'lrbtfaxdcogpskgi'
        }
      });

    const mailOptions = {
        from: 'howlerverify@gmail.com',
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is ${code}. It will expire in 10 minutes.`,
        html: `<p>Your verification code is <b>${code}</b>. It will expire in 10 minutes.</p>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ success: false, message: 'Failed to send verification code' });
        }
        res.send({ success: true, message: 'Verification code sent to email' });
    });

    res.send({ success: true, message: 'Verification code sent to email' });
});

router.post('/verify', async (req, res) => {
    const { email, code } = req.body;
    const Verification = req.db.Verification;
    const User = req.db.User;
    const verification = await Verification.findOne({ email, code });
    console.log(verification);
    if (!verification) {
        return res.status(400).send({ success: false, message: 'Invalid code' });
    } else if (verification.expiresAt < new Date()) {
        return res.status(400).send({ success: false, message: 'Code expired' });
    }

    const user = new User({ email, password: verification.password });
    await user.save();

    await Verification.deleteOne({ email });
    res.send({ success: true, message: 'Account created successfully' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const User = req.db.User;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        return res.status(400).send({ success: false, message: 'Invalid email or password' });
    }

    res.send({ success: true, message: 'Logged in successfully', userId: user._id});
});

router.post('/posts/byuser', async (req, res) => {
    const { userId } = req.body;
    const Post = req.db.Post;
    try {
      const posts = await Post.find({ author: userId }).populate('board', 'name');
      res.send({"posts": posts});
    } catch (err) {
      console.error(err);
      res.status(500).send({ success: false, message: 'Error fetching posts' });
    }
  });

router.post('/comments/byuser', async (req, res) => {
  const { userId } = req.body;
  const Comment = req.db.Comment;
  try {
    const comments = await Comment.find({ author: userId });
    res.send({"comments": comments});
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Error fetching comments' });
  }
});

// saved stuff beyond here
router.post('/save/post', async (req, res) => {
  const userId = req.body.userId;
  const dataId = req.body.dataId;
  const User = req.db.User;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }
    if (user.savedPosts.includes(dataId)) {
      return res.status(400).send({ success: false, message: 'Post already saved' });
    }
    user.savedPosts.push(dataId);
    await user.save();
    res.send({ success: true, message: 'Post saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Error saving post' });
  }
});

router.post('/save/comment', async (req, res) => {
  const { userId, dataId } = req.body;
  const User = req.db.User;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ success: false, message: 'User not found' });
    }
    user.savedComments.push(dataId);
    await user.save();
    
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Error saving comment to user' });
  }
});

router.post('/saved/posts', async (req, res) => {
  const { userId } = req.body;
  const User = req.db.User;
  const Post = req.db.Post;
  try {
    const user = await User.findById(userId).populate('savedPosts');
    if (!user) {
      return res.status(400).json({success: false, message: 'User not found' });
    }
    const uniquePostIds = new Set(user.savedPosts);
    const posts = await Promise.all([...uniquePostIds].map(async postId => {
      const post = await Post.findById(postId);
      return post;
    }));
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});

router.post('/saved/comments', async (req, res) => {
  const { userId } = req.body;
  const User = req.db.User;
  const Comment = req.db.Comment;
  try {
    const user = await User.findById(userId).populate('savedComments');
    if (!user) {
      return res.status(400).json({success: false, message: 'User not found' });
    }
    const uniqueCommentIds = new Set(user.savedComments);
    const comments = await Promise.all([...uniqueCommentIds].map(async commentId => {
      const comment = await Comment.findById(commentId);
      return comment;
    }));
    res.json({ comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});


router.post('/unsave/post', async (req, res) => {
  const userId = req.body.userId;
  const dataId = req.body.dataId;
  const User = req.db.User;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }
    if (!user.savedPosts.includes(dataId)) {
      return res.status(400).send({ success: false, message: 'Post not found in saved posts' });
    }
    user.savedPosts = user.savedPosts.filter(savedPost => savedPost != dataId);
    await user.save();
    res.send({ success: true, message: 'Post unsaved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Error unsaving post' });
  }
});

router.post('/unsave/comment', async (req, res) => {
  const { userId, dataId } = req.body;
  const User = req.db.User;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ success: false, message: 'User not found' });
    }
    if (!user.savedComments.includes(dataId)) {
      return res.status(400).send({ success: false, message: 'Comment not found in saved comments' });
    }
    user.savedComments = user.savedComments.filter(savedComment => savedComment != dataId);
    await user.save();
    res.send({ success: true, message: 'Comment unsaved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Error unsaving comment' });
  }
});

export default router;
