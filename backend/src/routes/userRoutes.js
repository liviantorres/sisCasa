const express = require('express');
const { auth, admin } = require('../middlewares/authMiddleware');
const { getUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();


router.get('/usuario', auth, getUser); // buscar usuário

//Rotas admin
router.get('/admin/usuarios', auth, admin, getAllUsers); // buscar todos os usuários

//Rotas PEP

//Rotas Servidor

module.exports = router;
