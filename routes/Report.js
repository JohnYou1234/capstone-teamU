import express from 'express';
const app  = express();

app.post('/addReport', async function (req, res) {
    const Report = req.db.Report;

    const newReport = new Report({
        user: req.body.reporter,
        post: req.body.postId,
        comment: req.body.commentId,
        type: req.body.type,
        text: req.body.text
    });
    try {
        await newReport.save();
        res.send({
            "success": true,
            "message": "Report added"
        });
    } catch {
        (err) => {
            res.send({
                "success": false,
                "message": "Error adding report",
                "err": err
            });
            return;
        }
    }
});

export default app;