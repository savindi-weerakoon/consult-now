import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4002;

app.get('/health', (req, res) => {
    res.json({ status: 'User Profile Service is running 🚀' });
});

app.get('/profile/:userId', (req, res) => {
    const { userId } = req.params;
    res.json({ userId, name: 'John Doe', role: 'counsellor' });
});

app.listen(PORT, () => {
    console.log(`User Profile Service listening on port ${PORT}`);
});

// Catch-all route for undefined paths
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
