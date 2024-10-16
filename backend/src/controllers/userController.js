
const User = require('../models/User');
const Role = require('../models/Role')

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario não existe' });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

exports.getAllUsers = async (req, res) => {
  console.log("Buscando todos os usuários..."); // Log para depuração
  try {
    const users = await User.findAll({
      include: { model: Role, through: { attributes: [] } }
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error); // Log do erro
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};



exports.editUser = async (req, res) => {
  const { userId } = req.params; 
  const { nomeCompleto, siape, dataDeNascimento, whatsapp, email, password, roleId } = req.body; 

  try {
   
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

   
    const updatedUser = await user.update({
      nomeCompleto,
      siape,
      dataDeNascimento,
      whatsapp,
      email,
      password,
      roleId
    });

    return res.status(200).json(updatedUser); 
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

