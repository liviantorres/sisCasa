const express = require('express');
const { auth, admin } = require('../middlewares/authMiddleware');
const { getUser, getAllUsers, editUser } = require('../controllers/userController');
const router = express.Router();


router.get('/usuario', auth, getUser); // buscar usuário
router.put(`/editar/:userId`, auth, editUser); // editar usuario

//Rotas admin
router.get('/admin', auth, admin, getAllUsers); // buscar todos os usuários

//Rotas PEP

//Rotas Servidor

module.exports = router;
