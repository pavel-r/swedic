'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var DictionarySchema = new mongoose.Schema({
  name: String,
  user_id: String,
  cards: [{
  	name : String,
  	translation : String,
  	soundUrl : String,
  	learnt : Boolean
  }]
});

export default mongoose.model('Dictionary', DictionarySchema);
