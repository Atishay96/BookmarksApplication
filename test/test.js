const mongoose = require("mongoose");
const User = require('../models/User');
const Bookmark = require('../models/Bookmarks');
//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);
//Our parent block

describe('User Flow', () => {
  // beforeEach((done) => { //Before each test we empty the database
  //     User.remove({}, (err) => { 
  //       done();         
  //     });     
  // });
  it('Remove all users', (done) => {
    User.remove({}, (err) => { 
      done();         
    });  
  });
  it('Remove all Bookmarks', (done) => {
    Bookmark.remove({}, (err) => { 
      done();         
    });  
  });
  let data ={
    email : 'jainatishay.j@gmail.com',
    password: 'hello',
    name: "Atishay"
  }
  let AuthToken;
  it('User Sign up', (done) => {
    chai.request(server)
    .post('/api/user/signup').send(data)
    .end((err, res) => {
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
        res.should.have.status(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token');
        AuthToken = res.body.data.token;
      done();
    });
  });
  let bookmark = {
    url: 'www.google.com',
    title: "Google",
    tags: ['google', 'elgoog']
  }
  it('Create Bookmark', (done) => {
    chai.request(server)
    .put('/api/user/bookmark').send(bookmark)
    .set({AuthToken})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('data');
      res.body.data.should.be.a('array');
      res.body.data.should.have.length(1);
      res.body.data.map((v,i)=>{
        v.should.have.property('url');
        v.should.have.property('title');
        v.should.have.property('tags');
        v.url.should.be.a('string');
        v.title.should.be.a('string');
        v.tags.should.be.a('array');
      })
      done();
    });
  });
  let _id;
  it('Get All Bookmarks', (done) => {
    chai.request(server)
    .get('/api/user/bookmarks')
    .set({AuthToken})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('data');
      res.body.data.should.be.a('array');
      res.body.data.should.have.length(1);
      res.body.data.map((v,i)=>{
        v.should.have.property('url');
        v.should.have.property('title');
        v.should.have.property('tags');
        v.url.should.be.a('string');
        v.title.should.be.a('string');
        v.tags.should.be.a('array');
      })
      _id = res.body.data[0]._id;
      done();
    });
  });
  it('Delete Bookmark', (done) => {
    chai.request(server)
    .post('/api/user/deletebookmark')
    .set({AuthToken})
    .send({_id:_id})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('data');
      res.body.data.should.be.a('array');
      res.body.data.should.have.length(0);
      done();
    });
  });
});
