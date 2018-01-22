const User = require('../models/db.js').User;
const Post = require('../models/db.js').Post;
const Comment = require('../models/db.js').Comment;
const bcrypt = require('bcryptjs');

function createUser(newUser) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash
            return User.create(newUser)
        })
    })
}
// return User.create({
//     username: 'janedoe3',
//     email: 'janedoe3@gmail.com',
//     token: 'fkfjdhfkahkfhkajfksdhfkjjsdahkjfsda',
//     address: '12313 e 54ave vancouver',
//     profilepic: '3thisismyprofilepic',
//     password: 'password3'
// });

function createPost() {
    return Post.create({
        Name: 'my first post',
        description: 'description for first post',
        location: 'Vancouver',
        pics: 'kjsdhfkshdkjf',
        active: true,
        userId: '3'
    });

}

function createComment() {
    return Promise.resolve(Comment.create({
        data: 'this is the comment data',
        postId: '1',
        userId: '5'
    }))
}


function findById(id) {
    return User.findById(id).then((user) => {
        console.log(user.id)
    })
}
// working
// function findByUsername(username) {
//     return User.findOne(username).then((user) => {
//         console.log(user.id)
//     })
// }

// working
function findByUsername(username,callback) {
    return User.findOne(username).then(callback)
}

function comparePassword(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        callback(err,isMatch)
    })
}

module.exports = {
    createUser: createUser,
    createPost: createPost,
    createComment: createComment,
    findById: findById,
    findByUsername: findByUsername,
    comparePassword:comparePassword
}