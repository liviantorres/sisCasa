const { types } = require('pg')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('siscasa', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres' 
})

sequelize.authenticate().then(function(){
    console.log("Conectou ao banco de dados!")
}).catch(function(error){
    console.log("Erro ao contectar: " + error)
})

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING
    },
    senha: {
        type: Sequelize.STRING
    }

});

Usuario.sync({force: true})