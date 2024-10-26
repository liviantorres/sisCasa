const Atividade = require("../models/Atividade");

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
    const atividades = await Atividade.findAll();
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
    const { id, alunoId } = req.params; 
    const { situacao } = req.body; 

    const atividade = await Atividade.findByPk(id);
    if (!atividade) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }

  
    const aluno = atividade.alunos.find((a) => a.alunoId === parseInt(alunoId));
    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado na atividade" });
    }

    aluno.situacao = situacao;

    await atividade.save();

    return res.status(200).json({
      message: "Situação do aluno atualizada com sucesso",
      aluno: aluno,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
