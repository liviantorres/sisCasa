const Categoria = require('./Categoria'); // Caminho correto para o modelo Categoria
const Pontuacao = require('./Pontuacao'); // Caminho correto para o modelo Pontuacao

// Definir as associações
Categoria.hasMany(Pontuacao, { foreignKey: 'categoriaId', as: 'pontuacoes' });
Pontuacao.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

module.exports = {
  Categoria,
  Pontuacao
};
