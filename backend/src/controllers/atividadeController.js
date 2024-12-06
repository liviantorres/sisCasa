const Atividade = require("../models/Atividade");
const User = require("../models/User");
const UserAtividade = require("../models/UserAtividade");
const { Op } = require("sequelize");
const AtividadeTabela = require("../models/AtividadeTabela")

exports.criarAtividade = async (req, res) => {
  try {
    const atividade = await Atividade.create(req.body);
    return res.status(201).json(atividade);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.listarAtividades = async (req, res) => {
  try {
    const atividades = await Atividade.findAll({
      include: [
        {
          model: User,
          through: { attributes: ['situacao'] },
          attributes: ['id', 'nomeCompleto', 'email']
        }
      ]
    });
    return res.status(200).json(atividades);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.obterAtividadePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const atividade = await Atividade.findByPk(id);
    if (!atividade) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }
    return res.status(200).json(atividade);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.atualizarAtividade = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Atividade.update(req.body, {
      where: { id },
    });
    if (!updated) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }
    const atividadeAtualizada = await Atividade.findByPk(id);
    return res.status(200).json(atividadeAtualizada);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.deletarAtividade = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Atividade.destroy({
      where: { id },
    });
    if (!deleted) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.obterFrequenciasPorData = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.query;

    const atividade = await Atividade.findByPk(id);
    if (!atividade) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }

    const frequenciaFiltrada = atividade.frequencia.find(
      (freq) => freq.data === data
    );

    if (!frequenciaFiltrada) {
      return res
        .status(404)
        .json({
          message: "Frequência não encontrada para a data especificada",
        });
    }

    return res.status(200).json(frequenciaFiltrada);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.atualizarFrequencias = async (req, res) => {
  try {
    const { id } = req.params;
    const { frequencia } = req.body;

    const atividade = await Atividade.findByPk(id);
    if (!atividade) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }

    atividade.frequencia = frequencia;
    await atividade.save();

    return res
      .status(200)
      .json({ message: "Frequências atualizadas com sucesso", atividade });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.atualizarSituacaoAluno = async (req, res) => {
  try {
    const { atividadeId, userId } = req.params;
    const { situacao } = req.body;

    const atividade = await Atividade.findByPk(atividadeId);
    const user = await User.findByPk(userId);

    if (!atividade || !user) {
      return res.status(404).json({ message: "Atividade ou Usuário não encontrado" });
    }

    const associacao = await UserAtividade.findOne({
      where: { atividadeId, userId },
    });

    if (!associacao) {
      return res.status(400).json({ message: "Aluno não está inscrito na atividade" });
    }

    await associacao.update({ situacao });

    return res.status(200).json({ message: "Situação do aluno atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar situação do aluno:", error);
    return res.status(500).json({ message: "Erro interno ao atualizar situação do aluno" });
  }
};


exports.atualizarFrequenciaPorAluno = async (req, res) => {
  try {
    const { id, data } = req.params;
    const { alunoId, situacao } = req.body;

    const atividade = await Atividade.findByPk(id);
    if (!atividade) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }

    const frequencia = atividade.frequencia.find((freq) => freq.data === data);
    if (!frequencia) {
      return res
        .status(404)
        .json({
          message: "Frequência não encontrada para a data especificada",
        });
    }

    const alunoFrequencia = frequencia.alunos.find((a) => a.alunoId == alunoId);
    if (!alunoFrequencia) {
      return res
        .status(404)
        .json({ message: "Aluno não encontrado na frequência" });
    }

    alunoFrequencia.situacao = situacao;

    await atividade.save();

    return res
      .status(200)
      .json({ message: "Frequência atualizada com sucesso", frequencia });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.listarAtividadesPorAluno = async (req, res) => {
  try {
    const { alunoId } = req.params;

    const aluno = await User.findByPk(alunoId, {
      include: [{
        model: Atividade,
        through: { attributes: ['situacao'] } 
      }]
    });

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    return res.status(200).json(aluno.Atividades);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.addAluno = async (req, res) => {
  try {
    const { atividadeId, userId } = req.params;
    const { situacao } = req.body;

    const atividade = await Atividade.findByPk(atividadeId);
    const user = await User.findByPk(userId);

    if (!atividade || !user) {
      return res.status(404).json({ message: "Atividade ou Usuário não encontrado" });
    }

    const existeAssociacao = await UserAtividade.findOne({
      where: { atividadeId, userId },
    });

    if (existeAssociacao) {
      return res.status(400).json({ message: "Aluno já inscrito na atividade" });
    }

    await UserAtividade.create({
      atividadeId: atividade.id,
      userId: user.id,
      situacao: situacao || "pendente",
    });

    return res.status(201).json({ message: "Aluno adicionado à atividade com sucesso" });
  } catch (error) {
    console.error("Erro ao adicionar aluno à atividade:", error);
    return res.status(500).json({ message: "Erro interno ao adicionar aluno à atividade" });
  }
};

exports.listarAtividadesNaoInscritasPorAluno = async (req, res) => {
  try {
    const { alunoId } = req.params;

    const atividadesInscritas = await UserAtividade.findAll({
      where: { userId: alunoId },
      attributes: ['atividadeId'],
    });

    const inscritasIds = atividadesInscritas.map(item => item.atividadeId);

    const atividadesNaoInscritas = await Atividade.findAll({
      where: {
        id: { [Op.notIn]: inscritasIds }
      }
    });

    return res.status(200).json(atividadesNaoInscritas);
  } catch (error) {
    console.error("Erro ao listar atividades não inscritas:", error);
    return res.status(500).json({ error: "Erro ao listar atividades não inscritas" });
  }
};

exports.listarAtividadesPorProfessor = async (req, res) => {
  try {
    const { professorId } = req.params;
    
    const atividades = await Atividade.findAll({
      where: { professorId },
      include: [
        {
          model: User,
          through: { attributes: ['situacao'] },
          attributes: ['id', 'nomeCompleto', 'email']
        }
      ]
    });
    
    if (atividades.length === 0) {
      return res.status(404).json({ message: "Nenhuma atividade encontrada para este professor" });
    }
    
    return res.status(200).json(atividades);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.buscarAtividadePorCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;

    // Busca a atividade pelo código
    const atividade = await AtividadeTabela.findOne({
      where: { codigo },
      include: [
        {
          model: User,
          through: { attributes: ['situacao'] },
          required: false, // 'required: false' garante que, mesmo sem associação, a atividade seja retornada
          attributes: ['id', 'nomeCompleto', 'email'],
        },
      ],
    });

    // Verifica se a atividade foi encontrada
    if (!atividade) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }

    // Se não houver usuários associados
    if (atividade.Users.length === 0) {
      return res.status(200).json({
        atividade: {
          id: atividade.id,
          nome: atividade.nome,
          codigo: atividade.codigo,
        },
        usuarios: 0, // Retorna 0 se não houver usuários associados
      });
    }

    // Processa os usuários associados para verificar a situação
    const usuariosComSituacao = atividade.Users.map((user) => ({
      id: user.id,
      nomeCompleto: user.nomeCompleto,
      email: user.email,
      situacao: user.UserAtividade?.situacao || 0, // Retorna 0 se não houver associação
    }));

    // Retorna os dados da atividade e a lista processada de usuários
    return res.status(200).json({
      atividade: {
        id: atividade.id,
        nome: atividade.nome,
        codigo: atividade.codigo,
        ...atividade.dataValues,
      },
      usuarios: usuariosComSituacao,
    });
  } catch (error) {
    console.error("Erro ao buscar atividade pelo código:", error);
    return res.status(500).json({ error: error.message });
  }
};

