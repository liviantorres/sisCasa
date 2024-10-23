
const User = require('../models/User');
const Role = require('../models/Role')

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

exports.getAllUsers = async (req, res) => {
  console.log("Buscando todos os usuários..."); 
  try {
    const users = await User.findAll({
      include: { model: Role, through: { attributes: [] } }
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error); 
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};


exports.editUser = async (req, res) => {
  const { userId } = req.params;
  const { nomeCompleto, siape, cpf, dataDeNascimento, whatsapp, email, password, roleIds } = req.body;

  try {
    // 1. Buscar o usuário pelo ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // 2. Atualizar os campos do usuário
    const updateData = {
      nomeCompleto,
      siape,
      cpf,
      dataDeNascimento,
      whatsapp,
      email,
    };

    // 3. Atualizar a senha se ela foi fornecida
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    await user.update(updateData);

    // 4. Atualizar os papéis (roles) do usuário
    if (roleIds && roleIds.length > 0) {
      const roles = await Role.findAll({ where: { id: roleIds } });
      await user.setRoles(roles); // Atualizar os papéis
    }

    // 5. Buscar novamente o usuário com os papéis atualizados
    const updatedUser = await User.findByPk(userId, {
      include: { model: Role, through: { attributes: [] } }, // Incluir os papéis
    });

    // 6. Retornar os dados atualizados do usuário
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};