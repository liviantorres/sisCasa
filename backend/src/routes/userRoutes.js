const express = require('express');
const { auth, admin } = require('../middlewares/authMiddleware');
const { getUser, getAllUsers, editUser,  listarUsuariosPorAtividade, getUserById } = require('../controllers/userController');
const router = express.Router();

router.get('/admin', auth, getAllUsers); // Você pode querer adicionar o middleware admin aqui
router.get('/usuario', auth, getUser);
router.get('/:id', auth, getUserById);
router.put(`/editar/:userId`, auth, editUser); 
router.get('/:atividadeId/atividades', auth, listarUsuariosPorAtividade);

module.exports = router;
