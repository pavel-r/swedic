'use strict';

var app = require('../..');
import request from 'supertest';
import User from './user.model';

var newDictionary;

describe('Dictionary API:', function() {

  var user, token;

  // Clear users before testing
  before(function() {
    return User.removeAsync().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return user.saveAsync();
    });
  });

  before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
  });

  // Clear users after testing
  after(function() {
    return User.removeAsync();
  });

  describe('GET /api/dictionarys', function() {
    var dictionarys;

    beforeEach(function(done) {
      request(app)
        .get('/api/dictionarys')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          dictionarys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      dictionarys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/dictionarys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/dictionarys')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'New Dictionary',
          cards : []
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDictionary = res.body;
          done();
        });
    });

    it('should respond with the newly created dictionary', function() {
      newDictionary.name.should.equal('New Dictionary');
      newDictionary.cards.length.should.equal(0);
    });

  });

  describe('GET /api/dictionarys/:id', function() {
    var dictionary;

    beforeEach(function(done) {
      request(app)
        .get('/api/dictionarys/' + newDictionary._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          dictionary = res.body;
          done();
        });
    });

    afterEach(function() {
      dictionary = {};
    });

    it('should respond with the requested dictionary', function() {
      dictionary.name.should.equal('New Dictionary');
      dictionary.cards.length.should.equal(0);
    });

  });

  describe('PUT /api/dictionarys/:id', function() {
    var updatedDictionary;

    beforeEach(function(done) {
      request(app)
        .put('/api/dictionarys/' + newDictionary._id)
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'Updated Dictionary',
          cards: [{
            name : 'new card',
            translation : 'new card translation',
            soundUrl : '',
            examples : ''
          }]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDictionary = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDictionary = {};
    });

    it('should respond with the updated dictionary', function() {
      updatedDictionary.name.should.equal('Updated Dictionary');
      updatedDictionary.cards.length.should.equal(1);
      updatedDictionary.cards[0].name.should.equal('new card');
    });

  });

  describe('DELETE /api/dictionarys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/dictionarys/' + newDictionary._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when dictionary does not exist', function(done) {
      request(app)
        .delete('/api/dictionarys/' + newDictionary._id)
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
