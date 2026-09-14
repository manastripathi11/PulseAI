const Quote = require('../models/Quote');

exports.submitQuote = async (req, res) => {
  try {
    const { name, email, phone, serviceRequired, budget, message } = req.body;
    
    if (!name || !email || !phone || !serviceRequired || !budget) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newQuote = new Quote({ name, email, phone, serviceRequired, budget, message });
    await newQuote.save();
    
    res.status(201).json({ message: 'Quote request submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
