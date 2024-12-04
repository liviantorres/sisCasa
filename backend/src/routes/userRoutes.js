const express = require('express');
const { auth, admin } = require('../middlewares/authMiddleware');
const { getUser, getAllUsers, editUser,  listarUsuariosPorAtividade, getUserById, getUsersByAtividade } = require('../controllers/userController');
const router = express.Router();

router.get('/admin', auth, getAllUsers); 
router.get('/usuario', auth, getUser);
router.get('/:id', auth, getUserById);
router.put(`/editar/:userId`, auth, editUser); 
router.get('/:atividadeId/atividades', auth, listarUsuariosPorAtividade);
router.get('/:atividadeId/alunos', getUsersByAtividade)

module.exports = router;
