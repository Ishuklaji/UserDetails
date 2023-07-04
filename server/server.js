const express = require('express');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv')
const app = express();


app.use(express.json());

dotenv.config()
connectDB()
// Routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
