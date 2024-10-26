const Categoria = require('./Categoria');
const Pontuacao = require('./Pontuacao');


const defineAssociations = () => {
  Categoria.hasMany(Pontuacao, { foreignKey: 'categoriaId', as: 'pontuacoes' });
  Pontuacao.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

};

defineAssociations();

module.exports = {
  Categoria,
  Pontuacao,
};
