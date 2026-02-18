const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: Date.now() });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});