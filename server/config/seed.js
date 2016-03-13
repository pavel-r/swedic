/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Dictionary from '../api/dictionary/dictionary.model';
import User from '../api/user/user.model';

Dictionary.find({}).removeAsync()
  .then(() => {
    //Dictionary.create();
  });

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
