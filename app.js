require('dotenv').config()
var User = require('./models/db.js').User;
var Post = require('./models/db.js').Post;
var sequelize = require('./models/db.js').sequelize;

sequelize.sync().then(function () {
    // User.create({
    //     username: 'janedoe3',
    //     email:'janedoe3@gmail.com',
    //     token:'fkfjdhfkahkfhkajfksdhfkjjsdahkjfsda',
    //     address:'12313 e 54ave vancouver',
    //     profilepic:'3thisismyprofilepic',
    //     password:'password3'
    // });
    return Post.create({
        Name: 'my first post',
        description:'description for first post',
        location:'Vancouver',
        pics:'kjsdhfkshdkjf',
        active:true,
        userId:'3'
    });
    
}).then(function (jane) {
    console.log(jane.get({
        plain: true
    }));
});