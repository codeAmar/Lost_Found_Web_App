require('dotenv').config()
const engine = require('./controller/engine.js');
const sequelize = require('./models/db.js').sequelize;
const express = require('express')
const app = express();
const cors= require('cors');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


app.use(morgan('dev'));
app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(session({
    secret: process.env.SECRET,
    resave:true,
    saveUninitialized: true
}))

app.use(cors());
app.set('view engine', 'ejs');
app.set('views','views');

app.use(passport.initialize());
app.use(passport.session());
// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  
  // Connect Flash
  app.use(flash());
  
  // Global Vars
  app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });
  
app.use(express.static(path.join(__dirname,'public')));
app.use(require('./routes/index'));


app.listen(4000,function(){
    console.log("server is running on port : 3000");
  });
  
//   sequelize
// .sync()
// .then(engine.findByUsername({where:{username:'janedoe1'}}))
// .then(console.log('entry found'))
  

// sequelize
// .sync()
// .then(engine.createUser({
//             username: 'janedoe7',
//             email: 'janedoe7@gmail.com',
//             token: 'fkfjdhfkahkfhkajfksdhfkjjsdahkjfsda',
//             address: '123137 e 54ave vancouver',
//             profilepic: '7thisismyprofilepic',
//             password: 'password7'
// }))
// .then(console.log('entry added'))


// working better than the previous one
// sequelize
//         .sync()
//         .then(engine.findByUsername({where:{username:'janedoe7'}},function(user){
//             console.log(user.id)
//         }))
        

// experimental
passport.use(new LocalStrategy(
    function(username, password, done) {
  
        sequelize
        .sync()
        .then(engine.findByUsername({where:{username:'janedoe1'}},function(err,user){
            if(err) throw err;
            console.log(user.id)
            if(!user){
                return done(null,false,{message:'Unknown User'})
            }
            User.comparePassword(password,user.password,function(err,isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null,user)
                }else{
                 return done(null, false, {message: 'Invalid password'});                    
                }
            })
        }))
        
  
    }));

  module.exports= app;
