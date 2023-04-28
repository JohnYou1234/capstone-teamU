import express from 'express';
const router = express();



router.post('/getPollData', async (req, res) => {
  try {
    const pollId = req.body.pollId;
    const userId = req.body.userId;
    const poll = await req.db.Poll.findById(pollId).populate('voters');

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    let hasVoted = false;
    let userVote = null;

    if (userId) {
      const voter = poll.voters.get(userId);
      if (voter || voter === 0) {
        hasVoted = true;
        userVote = voter.optionIndex;
      }
    }

    let pollData = {
      poll,
      hasVoted,
      userVote
    }

    res.json(pollData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  }
});

  

// POST /api/polls
// Create a new poll and associated post
router.post('/create', async (req, res) => {
    try {
      const { title, options, bgColor, category, boardId, userId, question, author, boardName } = req.body;
        
      // Validate request body
      if (!title || !options || options.length < 2) {
        return res.status(400).json({ message: 'Invalid poll data' });
      }
      const Poll = req.db.Poll;
      // Create new poll object
      const newPoll = new Poll({
        question: question,
        options,
        author
      });
  
      // Save new poll to database
  
      const Post = req.db.Post;
      // Create new post object and associate with poll
      const newPost = new Post({
        title,
        bgColor,
        content: "Poll",
        author: author,
        category,
        type: 'poll',
        board: boardId,
        boardName: boardName,
        date: Date.now(),
        pollId: newPoll._id
      });
  
      // Save new post to database
      await newPoll.save();
      await newPost.save();
  
      res.status(201).json({ message: 'Poll and post created successfully', poll: newPoll, post: newPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  
// POST /api/polls/vote
// Allow user to vote on a poll
router.post('/vote', async (req, res) => {
  try {
    const { optionIndex, userId, pollId } = req.body;

    // Retrieve poll from database
    const poll = await req.db.Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    if (!userId) {
      return res.status(400).json({message: "user not logged in"})
    }

    // Check if user has already voted on the poll
    if (poll.voters.has(userId)) {
      return res.status(400).json({ message: 'User has already voted on this poll' });
    }

    // Validate option index
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: 'Invalid option index' });
    }

    // Update poll data to reflect user's vote
    poll.votes[optionIndex] = (poll.votes[optionIndex] || 0) + 1;
    poll.voters.set(userId, optionIndex);
    await poll.save();
    const newData = Object.assign({}, poll.toObject());
    newData.hasVoted = true;
    res.json({ message: 'Vote recorded successfully', poll: newData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
