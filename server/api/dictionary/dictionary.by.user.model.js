'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var DictionaryByUserSchema = new mongoose.Schema({
  _id: ObjectId,
  dictionarys: [{
  	dictionary_id: ObjectId,
  	name : String
  }]
});

export default mongoose.model('DictionaryByUser', DictionaryByUserSchema);