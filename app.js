import express from 'express';
import { dirname }  from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3080;
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.resolve(__dirname, './howler/build')));

app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './howler/build', 'index.html'));
});