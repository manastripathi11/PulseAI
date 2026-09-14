const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    let existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'You are already subscribed' });
    }

    const newSub = new Newsletter({ email });
    await newSub.save();
    
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
