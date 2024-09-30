const Atividade = require('../models/Atividade');
const User = require('../models/User');


exports.criarAtividade = async (req, res) => {
  try {
    const { titulo, descricao, professorId, cargaHoraria, link, frequencias } = req.body;

   
    const usuario = await User.findByPk(professorId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

   
    const novaAtividade = await Atividade.create({
      titulo,
      descricao,
      professorId,
      cargaHoraria,
      link,
      frequencias
    });

    return res.status(201).json(novaAtividade);
  } catch (error) {
    console.error('Erro ao criar atividade:', error.message);
    return res.status(500).json({ message: 'Erro ao criar atividade' });
  }
};


exports.listarAtividades = async (req, res) => {
  try {
    const atividades = await Atividade.findAll({
      include: { model: User, as: 'responsavel', attributes: ['id', 'nomeCompleto'] } // Incluir informações do usuário responsável
    });

    return res.status(200).json(atividades);
  } catch (error) {
    console.error('Erro ao listar atividades:', error);
    return res.status(500).json({ message: 'Erro ao listar atividades' });
  }
};


exports.obterAtividadePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const atividade = await Atividade.findByPk(id, {
      include: { model: User, as: 'responsavel', attributes: ['id', 'nomeCompleto'] } // Incluir informações do usuário responsável
    });

    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    return res.status(200).json(atividade);
  } catch (error) {
    console.error('Erro ao obter atividade:', error);
    return res.status(500).json({ message: 'Erro ao obter atividade' });
  }
};


exports.atualizarAtividade = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, professorId, cargaHoraria, link, frequencias } = req.body;

  
    const atividade = await Atividade.findByPk(id);
    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

  
    await atividade.update({
      titulo,
      descricao,
      professorId,
      cargaHoraria,
      link,
      frequencias
    });

    return res.status(200).json(atividade);
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    return res.status(500).json({ message: 'Erro ao atualizar atividade' });
  }
};


exports.deletarAtividade = async (req, res) => {
  try {
    const { id } = req.params;

 
    const atividade = await Atividade.findByPk(id);
    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    
    await atividade.destroy();
    return res.status(204).json({ message: 'Atividade deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar atividade:', error);
    return res.status(500).json({ message: 'Erro ao deletar atividade' });
  }
};
