/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Dictionary from '../api/dictionary/dictionary.model';
import User from '../api/user/user.model';

User.find({}).removeAsync()
  .then(() => {
    return User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  })
  .then(() => {
    return Dictionary.find({}).removeAsync();
  })
  .then(() => {
    return User.findOneAsync({name: 'Test User'})
    .then(user => {
      return Dictionary.createAsync({
        name: 'Dictionary A',
        user_id: user._id,
        cards: [{
          name : "hej",
  	      translation : "hi, hello",
  	      learnt : false
        }, {
          name : "hej då",
          translation: "Goodbye",
          learnt: false
        }]
      },{
        name: 'Dictionary B',
        user_id: user._id,
        isPublic: true,
        cards: [{
          name : "hej",
  	      translation : "hi, hello",
  	      learnt : false
        }]
      });
    })
    .then(() => {
      console.log('finised populating dictionarys for Test User');
    });
  })
  .then(() => {
    return User.findOneAsync({name: 'Admin'}).then(user => {
      return Dictionary.createAsync({
        name: 'Dictionary 1',
        user_id: user._id,
        isPublic: true,
        cards: [{
          name : "kaka",
  	      translation : "cookie",
  	      learnt : false
        }]
      });
    });
  });
