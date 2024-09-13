
const User = require('../models/User');

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
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};
