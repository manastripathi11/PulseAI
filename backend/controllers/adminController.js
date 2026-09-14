const Contact = require('../models/Contact');
const User = require('../models/User');
const Quote = require('../models/Quote');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
