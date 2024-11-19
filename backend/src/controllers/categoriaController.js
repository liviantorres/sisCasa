const Categoria = require('../models/Categoria');
const Atividade = require('../models/AtividadeTabela')

async function listarCategorias(req, res) {
  try {
   
    const categorias = await Categoria.findAll({
      include: {
        model: Atividade,
        as: 'atividades', 
        attributes: ['codigo', 'nome', 'metrica', 'teto_autorizado', 'horas_submetidas', 'horas_consideradas'], // Campos que você deseja trazer das atividades
        required: false,
      },
    });

    res.status(200).json(categorias);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ error: 'Erro ao listar categorias' });
  }
}

async function criarCategoria(req, res) {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'O nome da categoria é obrigatório' });
  }

  try {
    const categoria = await Categoria.create({ nome });
    res.status(201).json(categoria);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
}


async function atualizarCategoria(req, res) {
  const { id } = req.params;
  const { nome } = req.body;


  if (!nome) {
    return res.status(400).json({ error: 'O nome da categoria é obrigatório' });
  }

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    categoria.nome = nome;
    await categoria.save();

    res.status(200).json(categoria);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
}


async function deletarCategoria(req, res) {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    await categoria.destroy();
    res.status(200).json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
}

module.exports = {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria,
};
