var Sequelize = require('sequelize');
var sequelize = new Sequelize('lostandfound', 'amarjotsingh', 'casiowr100m',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }});

var User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        isUnique: true,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    },
    username: {
        type: Sequelize.STRING,
        isUnique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        isUnique: true,
        allowNull: false,
        validate: {
            isEmail:true
        }
    },
    token: {
        type: Sequelize.STRING,
        isUnique:true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    profilepic: {
        type: Sequelize.BLOB('long'),
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false
    }

})

module.exports = {
     User : User,
     sequelize : sequelize
    }
    