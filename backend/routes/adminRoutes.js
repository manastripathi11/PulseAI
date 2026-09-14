const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// All admin routes must be protected by auth and admin middlewares
router.use(auth, admin);

router.get('/contacts', adminController.getContacts);
router.delete('/contacts/:id', adminController.deleteContact);
router.get('/users', adminController.getUsers);
router.get('/quotes', adminController.getQuotes);

module.exports = router;
