require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const seed = async () => {
  await connectDB();

  const existing = await User.findOne({ email: 'admin@example.com' });
  if (existing) {
    console.log('Admin already exists:', existing.email);
    process.exit(0);
  }

  await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'Admin',
    status: 'Active',
  });

  console.log('Admin created: admin@example.com / admin123');
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
