let mongoose = require("mongoose");
let User = require('../models/User');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);
//Our parent block

describe('User Test', () => {
  beforeEach((done) => { //Before each test we empty the database
      User.remove({}, (err) => { 
        done();         
      });     
  });
  let data ={
    email : 'jainatishay.j@gmail.com',
    password: 'hello',
    name: "Atishay"
  }
  let token;
  it('User Sign up', (done) => {
    chai.request(server)
    .post('/api/user/signup').send(data)
    .end((err, res) => {
      console.log(res.body);
        res.should.have.status(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token');
      done();
    });
  });
  it('Log the user in', (done) => {
    chai.request(server)
    .post('/api/user/login').send(data)
    .end((err, res) => {
      console.log(res.body);
        res.should.have.status(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token');
        token = res.body.data.token;
      done();
    });
  });
  
});
