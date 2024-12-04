const Frequencia = require('../models/Frequencia'); 
const Atividade = require('../models/Atividade'); 
const User = require('../models/User'); 

const sequelize = require('../config/Connection');


const criarFrequencia = async (req, res) => {
  try {
    const { data, alunos, atividadeId } = req.body;

    // Verificação inicial de dados
    if (!Array.isArray(alunos) || alunos.length === 0) {
      return res.status(400).json({ message: 'Deve ser fornecido um array de alunos.' });
    }

    // Verifica se a atividade existe
    const atividade = await Atividade.findByPk(atividadeId);
    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada!' });
    }

    // Inicia uma transação
    const transaction = await sequelize.transaction();
    try {
      const frequenciasCriadas = [];

      for (const aluno of alunos) {
        const { userId, situacao } = aluno;

        // Verifica se o usuário existe
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ message: `Usuário com ID ${userId} não encontrado!` });
        }

        // Verifica duplicidade
        const frequenciaExistente = await Frequencia.findOne({
          where: { data, userId, atividadeId },
          transaction, // Certifica-se de que a consulta está dentro da transação
        });

        if (!frequenciaExistente) {
          // Cria a frequência se não existir
          const frequencia = await Frequencia.create({
            data,
            situacao,
            userId,
            atividadeId,
          }, { transaction });

          frequenciasCriadas.push(frequencia);
        }
      }

      // Confirma a transação
      await transaction.commit();
      return res.status(201).json(frequenciasCriadas);

    } catch (error) {
      // Reverte a transação em caso de erro
      await transaction.rollback();
      console.error('Erro ao criar frequência dentro da transação:', error);
      return res.status(500).json({ message: 'Erro ao criar frequência' });
    }

  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};


const listarFrequenciasPorAtividade = async (req, res) => {
  try {
    const { atividadeId } = req.params;

    const frequencias = await Frequencia.findAll({
      where: { atividadeId },
      include: [
        { model: User, attributes: ['id', 'nomeCompleto'] }, 
        { model: Atividade, attributes: ['titulo'] }, 
      ],
    });

    return res.status(200).json(frequencias);
  } catch (error) {
    console.error('Erro ao listar frequências:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};


const atualizarFrequencia = async (req, res) => {
  try {
    const { frequenciaId } = req.params;
    const { data, situacao } = req.body;

    const frequencia = await Frequencia.findByPk(frequenciaId);

    if (!frequencia) {
      return res.status(404).json({ message: 'Frequência não encontrada!' });
    }

    frequencia.data = data || frequencia.data;
    frequencia.situacao = situacao || frequencia.situacao;

    await frequencia.save();

    return res.status(200).json(frequencia);
  } catch (error) {
    console.error('Erro ao atualizar a frequência:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};


const excluirFrequencia = async (req, res) => {
  try {
    const { frequenciaId } = req.params;

    const frequencia = await Frequencia.findByPk(frequenciaId);

    if (!frequencia) {
      return res.status(404).json({ message: 'Frequência não encontrada!' });
    }

    await frequencia.destroy();

    return res.status(200).json({ message: 'Frequência excluída com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir a frequência:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = {
  criarFrequencia,
  listarFrequenciasPorAtividade,
  atualizarFrequencia,
  excluirFrequencia,
};
