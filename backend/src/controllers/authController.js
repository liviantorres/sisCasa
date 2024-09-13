const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  const { nomeCompleto, siape, dataDeNascimento, genero, whatsapp, roleId, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já cadastrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const novoUsuario = await User.create({
      nomeCompleto,
      siape,
      dataDeNascimento,
      genero,
      whatsapp,
      roleId,
      email,
      password: hashedPassword 
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', user: novoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar o usuário.', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error });
  }
};

module.exports = {
  register,
  login
};
