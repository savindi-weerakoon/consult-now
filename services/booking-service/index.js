import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;

app.get('/health', (req, res) => {
    res.json({ status: 'Booking Service is running 🚀' });
});

app.post('/book', (req, res) => {
    const { customerId, counsellorId, timeSlot } = req.body;
    console.log('Booking request:', { customerId, counsellorId, timeSlot });

    // Placeholder response
    res.status(201).json({ success: true, bookingId: Date.now() });
});

app.listen(PORT, () => {
    console.log(`Booking Service listening on port ${PORT}`);
});

// Catch-all route for undefined paths
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

