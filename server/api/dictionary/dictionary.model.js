'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var DictionarySchema = new mongoose.Schema({
  name: String,
  cards: [{
  	name : String,
  	translation : String,
  	soundUrl : String,
  	examples : String
  }]
});

export default mongoose.model('Dictionary', DictionarySchema);
