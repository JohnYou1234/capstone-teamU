import express from 'express';
const router = express();

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

export default router;