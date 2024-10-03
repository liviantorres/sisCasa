const jwt = require('jsonwebtoken');

// Middleware de autenticação
exports.auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera o formato 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica o token JWT
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Adiciona os dados do token decodificado ao req.user
    next(); // Chama o próximo middleware
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

// Middleware de autorização para administradores
exports.admin = (req, res, next) => {
  // Supondo que roleId seja um número ou uma constante que representa o papel de admin
  if (req.user.roleId !== 1) {  // 1 seria o ID do papel de 'admin'
    return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
  }
  next(); // Chama o próximo middleware se o usuário for admin
};
