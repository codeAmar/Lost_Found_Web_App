require('dotenv').config()
const Sequelize = require('sequelize');
let sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

let User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        isUnique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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
            isEmail: true
        }
    },
    // for time sake i have allowed this value to null..in future change it.
    token: {
        type: Sequelize.STRING,
        isUnique: true
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
        allowNull: false
    }

})

let Post = sequelize.define('posts', {

    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pics: {
        type: Sequelize.BLOB('long'),
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

let Comment = sequelize.define('comments', {
    data: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})



User.hasMany(Post, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
})
Post.belongsTo(User, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
})
User.hasMany(Comment, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
})
Comment.belongsTo(User, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
})
Post.hasMany(Comment, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
})
Comment.belongsTo(Post, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
})

module.exports = {
    User: User,
    Post: Post,
    Comment: Comment,
    sequelize: sequelize
}