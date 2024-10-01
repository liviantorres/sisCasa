const Solicitacao = require('../models/Solicitacao');

// Criar uma nova solicitação
exports.createSolicitacao = async (req, res) => {
  const { usuarioId, cursoId } = req.body;

  try {
    const comprovante = req.file.path; // Obtém o caminho do comprovante PDF

    const novaSolicitacao = await Solicitacao.create({
      usuarioId,
      cursoId,
      comprovante,
      status: 'pendente'
    });

    return res.status(201).json(novaSolicitacao); // Retorna a nova solicitação criada
  } catch (error) {
    console.error('Erro ao criar solicitação:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Listar todas as solicitações
exports.getAllSolicitacoes = async (req, res) => {
  try {
    const solicitacoes = await Solicitacao.findAll();
    return res.status(200).json(solicitacoes); // Retorna todas as solicitações
  } catch (error) {
    console.error('Erro ao listar solicitações:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Buscar uma solicitação por ID
exports.getSolicitacaoById = async (req, res) => {
  const { solicitacaoId } = req.params;

  try {
    const solicitacao = await Solicitacao.findByPk(solicitacaoId);

    if (!solicitacao) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    return res.status(200).json(solicitacao); // Retorna a solicitação encontrada
  } catch (error) {
    console.error('Erro ao buscar solicitação:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

exports.updateStatusSolicitacao = async (req, res) => {
    const { solicitacaoId } = req.params;
    const { status, motivo } = req.body; // Obtém o status e o motivo do corpo da requisição
  
    try {
      const solicitacao = await Solicitacao.findByPk(solicitacaoId);
  
      if (!solicitacao) {
        return res.status(404).json({ message: 'Solicitação não encontrada' });
      }
  
      solicitacao.status = status;
      solicitacao.motivo = motivo; // Atualiza o motivo
      await solicitacao.save();
  
      return res.status(200).json(solicitacao); // Retorna a solicitação com status e motivo atualizados
    } catch (error) {
      console.error('Erro ao atualizar solicitação:', error);
      return res.status(500).json({ message: 'Erro no servidor' });
    }
  };
// Deletar uma solicitação
exports.deleteSolicitacao = async (req, res) => {
  const { solicitacaoId } = req.params;

  try {
    const solicitacao = await Solicitacao.findByPk(solicitacaoId);

    if (!solicitacao) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    await solicitacao.destroy();
    return res.status(200).json({ message: 'Solicitação deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar solicitação:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

//Ver comprovante
exports.getComprovante = async (req, res) => {
    const { solicitacaoId } = req.params;
  
    try {
      const solicitacao = await Solicitacao.findByPk(solicitacaoId);
  
      if (!solicitacao) {
        return res.status(404).json({ message: 'Solicitação não encontrada' });
      }
  
      const comprovantePath = solicitacao.comprovante;
  
      // Retorna o link do comprovante
      return res.status(200).json({ comprovanteUrl: `${req.protocol}://${req.get('host')}/${comprovantePath}` });
    } catch (error) {
      console.error('Erro ao buscar o comprovante:', error);
      return res.status(500).json({ message: 'Erro no servidor' });
    }
  };
