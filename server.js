require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./configuration/connection');
const equipmentRoutes = require('./routes/equipmentRoutes');
const sensorDataRoutes = require('./routes/sensorDataRoutes'); 
connectDB(); // Connect to MongoDB

const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the Predictive Maintenance API');
}); 

// Use equipment routes
app.use('/api/equipment', equipmentRoutes);

// Use sensor data routes
app.use('/api/sensor-data', sensorDataRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});