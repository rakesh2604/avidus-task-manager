const mongoose = require('mongoose');
const dns = require('dns');

// Node.js may resolve to a local DNS proxy that has no SRV support.
// Force use of public resolvers so mongodb+srv:// SRV lookups succeed.
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`DB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
