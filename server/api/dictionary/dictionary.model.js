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

// specify the transform schema option
if (!DictionarySchema.options.toObject) DictionarySchema.options.toObject = {};
DictionarySchema.options.toObject.transform = function (doc, ret, options) {
  delete ret.user_id;
};


// specify the transform schema option
if (!DictionarySchema.options.toJSON) DictionarySchema.options.toJSON = {};
DictionarySchema.options.toJSON.transform = function (doc, ret, options) {
  delete ret.user_id;
};

export default mongoose.model('Dictionary', DictionarySchema);
