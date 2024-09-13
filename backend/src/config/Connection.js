const { Sequelize } = require('sequelize')

const Connection = new Sequelize({
    dialect: 'postgres',
    database: 'siscasa',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    port: '5432'
})

module.exports = Connection;