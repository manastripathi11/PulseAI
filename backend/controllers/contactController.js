const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required fields' });
    }

    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();
    
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
