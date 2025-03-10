import itemRoutes from './routes/itemRoutes.js';
import express from 'express';
import cors from 'cors';
import path from 'path';


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({}));

app.use(express.json());
app.use('/api', itemRoutes);

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});