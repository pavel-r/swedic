'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var DictionaryByUserSchema = new mongoose.Schema({
  dictionarys: [{
  	dictionary_id: mongoose.ObjectId,
  	name : String
  }]
});

export default mongoose.model('DictionaryByUser', DictionaryByUserSchema);