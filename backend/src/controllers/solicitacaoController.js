const Solicitacao = require('../models/Solicitacao');


exports.createSolicitacao = async (req, res) => {
  const { usuarioId, tipoSolicitacao, cursoId, descricao, atividadeTabela } = req.body;

  try {
    let comprovante = null;
    let certificado = null;

    if (tipoSolicitacao === 'Contabilizar Horas' && req.file) {
      comprovante = req.file.path; 
    }

  
    const novaSolicitacao = await Solicitacao.create({
      usuarioId,
      tipoSolicitacao,
      cursoId: tipoSolicitacao === 'Certificado de Curso' ? cursoId : null, 
      comprovante,
      descricao,
      status: 'Pendente',
      atividadeTabela: atividadeTabela
    });

    return res.status(201).json(novaSolicitacao); 
  } catch (error) {
    console.error('Erro ao criar solicitação:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

exports.updateSolicitacao = async (req, res) => {
  const { solicitacaoId } = req.params;
  const { tipoSolicitacao, cursoId, descricao, status, motivo } = req.body;

  try {
    const solicitacao = await Solicitacao.findByPk(solicitacaoId);

    if (!solicitacao) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    if (tipoSolicitacao) solicitacao.tipoSolicitacao = tipoSolicitacao;
    if (cursoId) solicitacao.cursoId = cursoId;
    if (descricao) solicitacao.descricao = descricao;
    if (status) solicitacao.status = status;
    if (motivo) solicitacao.motivo = motivo;

    if (req.file) {
      solicitacao.comprovante = req.file.path;
    }
    await solicitacao.save();

    return res.status(200).json(solicitacao);
  } catch (error) {
    console.error('Erro ao atualizar solicitação:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};



exports.getAllSolicitacoes = async (req, res) => {
  try {
    const solicitacoes = await Solicitacao.findAll();
    return res.status(200).json(solicitacoes); 
  } catch (error) {
    console.error('Erro ao listar solicitações:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};


exports.getSolicitacaoById = async (req, res) => {
  const { solicitacaoId } = req.params;

  try {
    const solicitacao = await Solicitacao.findByPk(solicitacaoId);

    if (!solicitacao) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    return res.status(200).json(solicitacao); 
  } catch (error) {
    console.error('Erro ao buscar solicitação:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};


exports.updateStatusSolicitacao = async (req, res) => {
  const { solicitacaoId } = req.params;
  const { status, motivo } = req.body; 

  try {
    const solicitacao = await Solicitacao.findByPk(solicitacaoId);

    if (!solicitacao) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    solicitacao.status = status || solicitacao.status;

    if (motivo) {
      solicitacao.motivo = motivo;
    }

    if (req.file) {
      solicitacao.certificado = req.file.path; 
    }

    await solicitacao.save();

    return res.status(200).json(solicitacao); 
  } catch (error) {
    console.error('Erro ao atualizar solicitação:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};



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


exports.getComprovante = async (req, res) => {
  const { solicitacaoId } = req.params;

  try {
    const solicitacao = await Solicitacao.findByPk(solicitacaoId);

    if (!solicitacao) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    if (solicitacao.tipoSolicitacao !== 'Contabilizar Horas') {
      return res.status(400).json({ message: 'Solicitação não requer comprovante' });
    }

    const comprovantePath = solicitacao.comprovante;

    return res.status(200).json({ comprovanteUrl: `${req.protocol}://${req.get('host')}/${comprovantePath}` });
  } catch (error) {
    console.error('Erro ao buscar o comprovante:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};


exports.getSolicitacoesByUsuarioId = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const solicitacoes = await Solicitacao.findAll({
      where: { usuarioId },
    });

    if (!solicitacoes || solicitacoes.length === 0) {
      return res.status(404).json({ message: 'Nenhuma solicitação encontrada para este usuário' });
    }

    return res.status(200).json(solicitacoes);
  } catch (error) {
    console.error('Erro ao buscar solicitações pelo usuarioId:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

