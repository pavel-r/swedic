/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import Dictionary from '../api/thing/dictionary.model';
import User from '../api/user/user.model';

Dictionary.find({}).removeAsync()
  .then(() => {
    Dictionary.create({
      name: 'SwedishA',
      cards: []
    }, {
      name: 'SwedishB',
      cards: [{
        name : 'hey',
        translation : 'hi',
        soundUrl : '',
        examples : 'hey du'
      },{
        name : 'ett',
        translation : 'one',
        soundUrl : '',
        examples : 'ett apple'
      }]
    });
  });

Thing.find({}).removeAsync()
  .then();

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
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
  });
