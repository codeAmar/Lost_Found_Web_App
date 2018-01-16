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

app.use(express.static(path.join(__dirname,'public')));

app.use(require('./routes/index'));


app.listen(3000,function(){
    console.log("server is running on port : 3000");
  });
  
  
  
  module.exports= app;

// sequelize
// .sync()
// .then(engine.createComment())
// .then(console.log('entry added'))