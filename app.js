require('dotenv').config()
var User = require('./models/db.js').User;
var sequelize = require('./models/db.js').sequelize;

sequelize.sync().then(function () {
    return User.create({
        username: 'janedoe2',
        email:'janedoe2@gmail.com',
        token:'fkfjdhfkahkfhkajfksdhfkjjsdahkjfsda',
        address:'12312 e 54ave vancouver',
        profilepic:'2thisismyprofilepic',
        password:'password2'
    });
}).then(function (jane) {
    console.log(jane.get({
        plain: true
    }));
});