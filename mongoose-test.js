var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/swedic-dev');

var db = mongoose.connection;
db.on('error', function(){
 console.error('connection error:');
});

db.once('open', function() {
  console.log('Connected!');
});

//var mongoose = require('bluebird').promisifyAll(require('mongoose'));

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

Dictionary = mongoose.model('Dictionary', DictionarySchema);

var newDic = new Dictionary({ name: 'a' , cards : [{name : '1'}, {name: '2'}]});
newDic.save(function(err, dic){
 if(err) return console.error(err);
 console.log('dic added');
});

Dictionary.find({}, '-_id -__v -user_id -cards._id', function (err, dic) {
  if (err) return console.error(err);
  console.log(JSON.stringify(dic));
});
