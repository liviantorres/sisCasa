const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role'); 

const register = async (req, res) => {
  const { nomeCompleto, siape, cpf, dataDeNascimento, whatsapp, email, password, roleIds } = req.body;

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
      cpf,
      dataDeNascimento,
      whatsapp,
      email,
      password: hashedPassword 
    });

  
    if (roleIds && roleIds.length > 0) {
      const roles = await Role.findAll({
        where: { id: roleIds } 
      });
      await novoUsuario.addRoles(roles); 
    }

    res.status(201).json({ message: 'Usuário criado com sucesso!', user: novoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar o usuário.', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password, roleId } = req.body;

  try {
 
    const user = await User.findOne({ 
      where: { email }, 
      include: { model: Role, through: { attributes: [] } }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const hasRole = user.Roles.some(role => role.id === roleId);
    if (!hasRole) {
      return res.status(403).json({ message: 'O papel selecionado não está associado ao usuário.' });
    }

 
    const token = jwt.sign(
      { id: user.id, email: user.email, roleId }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login bem-sucedido!',
      id: user.id,
      token,
      email: user.email,
      roleId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error });
  }
};

module.exports = {
  register,
  login
};

