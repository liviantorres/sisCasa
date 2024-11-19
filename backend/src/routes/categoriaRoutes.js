const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rota para listar todas as categorias
router.get('/', categoriaController.listarCategorias);

// Rota para criar uma nova categoria
router.post('/', categoriaController.criarCategoria);

// Rota para atualizar uma categoria existente
router.put('/:id', categoriaController.atualizarCategoria);

// Rota para deletar uma categoria
router.delete('/:id', categoriaController.deletarCategoria);

module.exports = router;
