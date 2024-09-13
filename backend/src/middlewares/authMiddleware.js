const jwt = require('jsonwebtoken');

// Middleware de autenticação
exports.auth = (req, res, next) => {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecta o formato 'Bearer <token>'

  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
  
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next(); 
  } catch (err) {
    res.status(400).json({ message: 'Token Inválido' });
  }
};

// Middleware de autorização para administradores
exports.admin = (req, res, next) => {
  if (req.user.role !== 'admin') {  
    return res.status(403).json({ message: 'Acesso negado' });
  }
  next(); 
};
