const User = require('../models/User');
const AtividadeTabela = require('../models/AtividadeTabela');
const Participacao = require('../models/Participacao');

const atualizarPontuacao = async (req, res) => {
  const { usuarioId, atividadeCodigo } = req.params;
  const { horasSubmetidas, horasConsideradas } = req.body;

  try {
    const usuario = await User.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const atividade = await AtividadeTabela.findOne({
      where: { codigo: atividadeCodigo },
    });

    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    let pontuacao = await Pontuacao.findOne({
      where: { userId: usuarioId, atividadeTabelaId: atividade.id },
    });

    if (!pontuacao) {
      pontuacao = await Pontuacao.create({
        userId: usuarioId,
        atividadeTabelaId: atividade.id,
        horasSubmetidas: horasSubmetidas || 0, 
        horasConsideradas: horasConsideradas || 0,
      });
      return res.status(201).json({ message: 'Pontuação criada com sucesso', pontuacao });
    }

    pontuacao.horasSubmetidas = horasSubmetidas || pontuacao.horasSubmetidas;
    pontuacao.horasConsideradas = horasConsideradas || pontuacao.horasConsideradas;

    await pontuacao.save();

    return res.status(200).json({ message: 'Pontuação atualizada com sucesso', pontuacao });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar ou criar pontuação', error });
  }
};

const atualizarHorasAtividades = async (req, res) => {
  try {
    const { codigo, userId, horasSubmetidas, horasConsideradas } = req.body;

    // Encontra a atividade pelo código
    const atividade = await AtividadeTabela.findOne({ where: { codigo } });

    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    // Encontra a participação do usuário na atividade
    let participacao = await Participacao.findOne({
      where: {
        atividadeTabelaId: atividade.id,
        userId: userId
      }
    });

    if (!participacao) {
      // Cria uma nova participação se não existir
      participacao = await Participacao.create({
        atividadeTabelaId: atividade.id,
        userId: userId,
        horasSubmetidas: horasSubmetidas || 0,
        horasConsideradas: horasConsideradas || 0
      });

      participacao.atividadeId = atividade.id;
      await participacao.save();

      // Atualiza as horas concluídas do usuário
      await atualizarHorasConcluidas(userId);

      return res.status(201).json({
        message: 'Participação criada com sucesso!',
        participacao
      });
    }

    // Atualiza as horas da participação existente
    participacao.horasSubmetidas = horasSubmetidas;
    participacao.horasConsideradas = horasConsideradas;
    await participacao.save();

    // Atualiza as horas concluídas do usuário
    await atualizarHorasConcluidas(userId);

    return res.status(200).json({ message: 'Horas atualizadas com sucesso!', participacao });
  } catch (error) {
    console.error('Erro ao atualizar horas:', error);
    return res.status(500).json({ message: 'Erro ao atualizar as horas', error: error.message });
  }
};

const atualizarHorasConcluidas = async (userId) => {
  try {
  
    const participacoes = await Participacao.findAll({
      where: { userId },
      include: [{ model: AtividadeTabela }] 
    });


    const totalHoras = participacoes.reduce((sum, participacao) => {
      return sum + participacao.horasConsideradas;
    }, 0);

    
    await User.update({ horasConcluidas: totalHoras }, { where: { id: userId } });
  } catch (error) {
    console.error('Erro ao atualizar horas concluídas do usuário:', error);
  }
};

const buscarParticipacao = async (req, res) =>{
  try {
    const { userId } = req.params;
    if(!userId){
      return res.status(400).json({ message: 'O campo userId é obrigatório.' });
    }

    const participacoes = await Participacao.findAll({ where: {userId}})
    return res.status(200).json(participacoes);
  } catch (error) {
    console.error('Erro ao buscar participaçao: ', error);
    return res.status(500).json({message: 'Erroa ao buscar participaçoes', error: error.message});
  }
}

module.exports = {
  atualizarPontuacao,atualizarHorasAtividades, buscarParticipacao
};
