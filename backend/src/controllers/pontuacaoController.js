const User = require("../models/User");

const {Categoria, Pontuacao} = require("../models/AssociacaoTabelaDePontos");

exports.criarPontuacao = async (req, res) => {
  const {
    categoriaId, 
    descricao,
    metrica,
    tetoHoras,
    horasSubmetidas,
    horasConsideradas,
  } = req.body;

  try {
    // Verifica se a categoria existe
    const categoria = await Categoria.findByPk(categoriaId);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    // Cria a nova pontuação associada à categoria
    const novaPontuacao = await Pontuacao.create({
      categoriaId, // Associa à categoria
      descricao,
      metrica,
      tetoHoras,
      horasSubmetidas,
      horasConsideradas,
    });

    return res.status(201).json(novaPontuacao);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar pontuação.", error });
  }
};

exports.associarHoras = async (req, res) => {
  const { usuarioId, pontuacaoId, horasSubmetidas } = req.body;

  try {
    const usuario = await User.findByPk(usuarioId);
    const pontuacao = await Pontuacao.findByPk(pontuacaoId);

    if (!usuario || !pontuacao) {
      return res
        .status(404)
        .json({ message: "Usuário ou pontuação não encontrados." });
    }

    await usuario.addPontuacao(pontuacao, { through: { horasSubmetidas } });

    return res.status(200).json({ message: "Horas submetidas com sucesso!" });
  } catch (error) {
    console.error("Erro ao associar horas:", error);
    return res.status(500).json({ message: "Erro ao associar horas.", error });
  }
};

exports.obterPontuacoes = async (req, res) => {
  try {
    // Inclui a categoria associada na resposta
    const pontuacoes = await Pontuacao.findAll({
      include: [{ model: Categoria, as: "categoria" }],
    });
    return res.status(200).json(pontuacoes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar pontuações.", error });
  }
};

exports.obterPontuacoesUsuario = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const usuario = await User.findByPk(usuarioId, {
      include: {
        model: Pontuacao,
        through: { attributes: ["horasSubmetidas", "horasConsideradas"] },
      },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json(usuario.Pontuacaos);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar pontuações do usuário.", error });
  }
};

exports.atualizarPontuacao = async (req, res) => {
  const { id } = req.params;
  const { descricao, tetoHoras, horasSubmetidas, horasConsideradas, categoriaId } = req.body;

  try {
    const pontuacao = await Pontuacao.findByPk(id);

    if (!pontuacao) {
      return res.status(404).json({ message: "Pontuação não encontrada." });
    }

    // Verifica se a categoria a ser associada existe
    if (categoriaId) {
      const categoria = await Categoria.findByPk(categoriaId);
      if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada." });
      }
    }

    await pontuacao.update({
      descricao,
      tetoHoras,
      horasSubmetidas,
      horasConsideradas,
      categoriaId, // Atualiza a categoria se for fornecida
    });

    return res.status(200).json(pontuacao);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar pontuação.", error });
  }
};

exports.removerPontuacao = async (req, res) => {
  const { id } = req.params;

  try {
    const pontuacao = await Pontuacao.findByPk(id);

    if (!pontuacao) {
      return res.status(404).json({ message: "Pontuação não encontrada." });
    }

    await pontuacao.destroy();
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao remover pontuação.", error });
  }
};
