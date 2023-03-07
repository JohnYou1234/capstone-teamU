import express from 'express';
import { dirname }  from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import db from './config/db.js';
import PostRouter from './routes/Posts.js';
import CommentRouter from './routes/Comments.js';
import BoardRouter from './routes/Boards.js';
const app = express();
const PORT = process.env.PORT || 3080;
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(function (req, res, next) {
    req.db = db;
    next()
})

app.use('/api/posts', PostRouter);
app.use('/api/comments', CommentRouter);
app.use('/api/boards', BoardRouter);
app.use(express.static(path.resolve(__dirname, './howler/build')));
app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './howler/build', 'index.html'));
});