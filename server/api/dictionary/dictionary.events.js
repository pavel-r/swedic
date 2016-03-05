/**
 * Dictionary model events
 */

'use strict';

import {EventEmitter} from 'events';
var Dictionary = require('./dictionary.model');
var DictionaryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DictionaryEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Dictionary.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DictionaryEvents.emit(event + ':' + doc._id, doc);
    DictionaryEvents.emit(event, doc);
  }
}

export default DictionaryEvents;
