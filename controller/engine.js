const User = require('../models/db.js').User;
const Post = require('../models/db.js').Post;
const Comment = require('../models/db.js').Comment;

function createUser() {
    return User.create({
        username: 'janedoe3',
        email: 'janedoe3@gmail.com',
        token: 'fkfjdhfkahkfhkajfksdhfkjjsdahkjfsda',
        address: '12313 e 54ave vancouver',
        profilepic: '3thisismyprofilepic',
        password: 'password3'
    });

}

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
        })
    )
}

module.exports = {
createUser:createUser,
createPost:createPost,
createComment:createComment
}