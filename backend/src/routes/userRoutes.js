const express = require('express');
const { auth, admin } = require('../middlewares/authMiddleware');
const { getUser, getAllUsers, editUser } = require('../controllers/userController');
const router = express.Router();


router.get('/usuario', auth, getUser);
router.put(`/editar/:userId`, auth, editUser); 
router.get('/admin', auth, admin, getAllUsers);

module.exports = router;
