const express = require('express');
const app = express.Router();

//get login page
app.get('/', (req, res)=>{
  res.render('../views/index.ejs');
})

//get sign up page
app.get('/signup', (req, res)=>{
  res.render('../views/signup.ejs');
})

//bookmark page
app.get('/list', (req, res)=>{
  res.render('../views/list.ejs');
})

module.exports = app;