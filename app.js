import express from 'express';
import itemRoutes from './routes/itemRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/api', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});