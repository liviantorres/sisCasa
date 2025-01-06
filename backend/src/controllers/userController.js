
const User = require('../models/User');
const Role = require('../models/Role');
const Atividade = require('../models/Atividade');
const UserAtividade = require('../models/UserAtividade');
const bcrypt = require('bcrypt');


exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: { model: Role, through: { attributes: [] } } 
    });
    if (!user) return res.status(404).json({ message: 'Usuario não existe' });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: { model: Role, through: { attributes: [] } }
    });
    if (!user) return res.status(404).json({ message: 'Usuario não existe' });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

exports.getAllUsers = async (req, res) => {
  console.log("Buscando todos os usuários..."); 
  try {
    const users = await User.findAll({
      include: { model: Role, through: { attributes: [] } }
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.message); 
    return res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};



exports.editUser = async (req, res) => {
  const { userId } = req.params;
  const { nomeCompleto, siape, cpf, dataDeNascimento, whatsapp, email, password, roleIds, horasConcluidas } = req.body;

  if (!nomeCompleto || !siape || !cpf || !dataDeNascimento || !whatsapp || !email) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const updateData = {
      nomeCompleto,
      siape,
      cpf,
      dataDeNascimento,
      whatsapp,
      email,
      horasConcluidas: horasConcluidas || user.horasConcluidas, // Mantém o valor atual se não for fornecido
    };

    // Se a senha for fornecida, atualiza a senha
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // Atualiza o usuário
    await user.update(updateData);

    if (roleIds && roleIds.length > 0) {
      const roles = await Role.findAll({ where: { id: roleIds } });
      await user.setRoles(roles); 
    }

    const updatedUser = await User.findByPk(userId, {
      include: { model: Role, through: { attributes: [] } },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

exports.getUserActivities = async (req, res) => {
  const userId = req.params.id; 

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Atividade,
          through: {
            model: UserAtividade,
            attributes: ['situacao'] 
          }
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar atividades do usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};


exports.listarUsuariosPorAtividade = async (req, res) => {
  try {
    const { atividadeId } = req.params;

    const atividade = await Atividade.findByPk(atividadeId);
    if (!atividade) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }

    const usuarios = await User.findAll({
      include: [
        {
          model: Atividade,
          where: { id: atividadeId },
          through: { attributes: ['situacao'] },
          attributes: []
        }
      ],
      attributes: ['id', 'nomeCompleto', 'email']
    });

    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getUsersByAtividade = async (req, res) => {
  const { atividadeId } = req.params; 
  console.log(`Buscando usuários para a atividade ID ${atividadeId}...`);
  try {
    const atividade = await Atividade.findByPk(atividadeId, {
      include: {
        model: User,
        through: { attributes: [] }, 
        attributes: ['id', 'nomeCompleto', 'email'], 
      },
    });

    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    return res.status(200).json(atividade.Users);
  } catch (error) {
    console.error('Erro ao buscar usuários para a atividade:', error.message);
    return res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};
