import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4003;

app.get('/health', (req, res) => {
    res.json({ status: 'Message Service is running 🚀' });
});

app.get('/messages/:userId', (req, res) => {
    const { userId } = req.params;
    res.json({
        userId,
        messages: [
            { id: 1, from: 'counsellor1', text: 'Hello, how can I help you?' },
            { id: 2, from: 'counsellor1', text: 'Are you available tomorrow?' }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Message Service listening on port ${PORT}`);
});

// Catch-all route for undefined paths
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
