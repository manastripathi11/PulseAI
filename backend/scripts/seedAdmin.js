require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pulseai', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@pulseai.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = new User({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user seeded successfully. Credentials: admin@pulseai.com / admin123');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
