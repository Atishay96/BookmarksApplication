const express = require('express');
const app = express.Router();

app.get('/', (req, res)=>{
  res.render('../views/index.ejs');
})

app.get('/signup', (req, res)=>{
  res.render('../views/signup.ejs');
})

app.get('/list', (req, res)=>{
  res.render('../views/list.ejs');
})

module.exports = app;