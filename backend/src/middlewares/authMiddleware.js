const jwt = require('jsonwebtoken');

// Middleware de autenticação
exports.auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

// Middleware de autorização para admin
exports.admin = (req, res, next) => {
  if (req.user.roleId !== 1) {  
    return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
  }
  next();
};
