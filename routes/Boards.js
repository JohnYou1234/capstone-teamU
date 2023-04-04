import express from 'express';
const router = express();
import validator from 'validator'

// get all boards
router.get('/viewAll', async function (req, res) {
    try {
        const Board = req.db.Board;
        const boards = await Board.find().sort({date: -1});
        boards.sort((a, b) => {
            return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        });
        res.send({
            "boards": boards,
            'success': true
        });
    } catch {
        (err) => {
            res.send({
                "success": false,
                "message": "Error getting boards"
            });
            return;
        }
    }
});

router.post('/create', async function (req, res) {
    const Board = req.db.Board;
  
    try {
      const existingBoard = await Board.exists({ name: { '$regex': req.body.name, $options: 'i' } })
      if (existingBoard) {
        res.send({
          "success": false,
          "message": "Board already exists"
        });
        return;
      }
  
      const newBoard = new Board({
        name: req.body.name,
        description: req.body.description
      });
  
      await newBoard.save();
      res.send({
        "success": true,
        "message": "Board created"
      });
    } catch (err) {
      res.send({
        "success": false,
        "message": "Error creating board",
        "error": err
      });
    }
  });

// get board name based on id
router.get('/getBoardName/:id', async function (req, res) {
    try {
        const Board = req.db.Board;
        const board = await Board.findOne({_id: req.params.id});
        res.send({
            "board": board,
            'success': true
        });
    } catch {
        (err) => {
            res.send({
                "success": false,
                "message": "Error getting board"
            });
            return;
        }
    }
});

// search for boards by name
router.get('/search', async (req, res) => {
  const query = req.query.q; // Get the search query from the request URL query params
  // Sanitize the search query
  const sanitizedQuery = validator.escape(query);
  try {
    const Board = req.db.Board;
    const boards = await Board.find({ name: { $regex: sanitizedQuery, $options: 'i' } });
    res.send({
        'success': true,
        'boards': boards
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;