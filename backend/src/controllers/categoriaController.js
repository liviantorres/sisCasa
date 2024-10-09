const { Categoria, Pontuacao } = require('../models/AssociacaoTabelaDePontos');

exports.criarCategoria = async(req, res) => {
    try {
      const categoria = await Categoria.create(req.body);
      res.status(201).json(categoria);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar categoria', detalhes: error.message });
    }
  },

exports.listarCategorias= async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar categorias', detalhes: error.message });
    }
  }
  exports.obterPontuacoesPorCategoria = async (req, res) => {
    const { categoriaId } = req.params;
  
    try {
      console.log(`Buscando categoria com ID: ${categoriaId}`);
  
      const categoria = await Categoria.findByPk(categoriaId, {
        include: [{
          model: Pontuacao,
          as: 'pontuacoes',
        }],
      });
  
      if (!categoria) {
        console.log("Categoria não encontrada");
        return res.status(404).json({ message: "Categoria não encontrada." });
      }
  
      console.log("Categoria encontrada:", categoria);
      return res.status(200).json(categoria.pontuacoes);
    } catch (error) {
      console.error("Erro ao buscar pontuações da categoria:", error);
      return res.status(500).json({ message: "Erro ao buscar pontuações da categoria.", error });
    }
  };
  

