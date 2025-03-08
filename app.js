import itemRoutes from './routes/itemRoutes.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({}));

app.use(express.json());
app.use('/api', itemRoutes);

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});