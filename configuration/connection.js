const mongoose = require('mongoose');
const setServers = require("node:dns/promises").setServers; // Set custom DNS servers
setServers(["1.1.1.1", "8.8.8.8"]); // Use Cloudflare and Google DNS servers for better reliability
const connectDB = async () => { 
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;