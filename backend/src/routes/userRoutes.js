const express = require('express');
const { auth, admin } = require('../middlewares/authMiddleware');
const { getUser, getAllUsers, editUser, getUserActivities, getUserById } = require('../controllers/userController');
const router = express.Router();


router.get('/usuario', auth, getUser);
router.get('/:id', auth, getUserById);
router.put(`/editar/:userId`, auth, editUser); 
router.get('/admin', auth, admin, getAllUsers);
router.get('/:userId/atividades', auth, getUserActivities);

module.exports = router;
