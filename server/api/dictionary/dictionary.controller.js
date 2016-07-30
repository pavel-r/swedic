/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/dictionarys              ->  index
 * POST    /api/dictionarys              ->  create
 * GET     /api/dictionarys/:id          ->  show
 * PUT     /api/dictionarys/:id          ->  update
 * PUT     /api/dictionarys/:id/reset    ->  reset
 * DELETE  /api/dictionarys/:id          ->  destroy
 * 
 * POST    /api/dictionarys/:id/cards           ->  create
 * PUT     /api/dictionarys/:id/cards/:cardId   ->  update
 * DELETE  /api/dictionarys/:id/cards/:cardId   ->  destroy
 */

'use strict';

import _ from 'lodash';
import Dictionary from './dictionary.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Dictionarys
export function index(req, res) {
  Dictionary.findAsync({user_id : req.user._id})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Dictionary from the DB
export function show(req, res) {
  var projection = req.query.to_json ? '-_id -__v -cards._id' : '';
  Dictionary.findOneAsync({_id : req.params.id, user_id : req.user._id}, projection)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Dictionary in the DB
export function create(req, res) {
  req.body.user_id = req.user._id;
  Dictionary.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Dictionary in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Dictionary.findOneAndUpdateAsync(
    {_id : req.params.id, user_id : req.user._id}, 
    {$set : req.body},
    {new : true})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//Set all cards in the dictionary as not learnt
export function reset(req, res) {
  Dictionary.findOneAsync(
    {
      _id : req.params.id, 
      user_id : req.user._id
    })
    .then(dic => {
      if (dic) {
        dic.cards.forEach(card => {
          card.learnt = false;
        });
        return dic.saveAsync(dic).then(() => { return dic});
      } else {
        return null;
      }
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Dictionary from the DB
export function destroy(req, res) {
  Dictionary.findOneAndRemoveAsync({_id : req.params.id, user_id : req.user._id})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res, 204))
    .catch(handleError(res));
}

// Create a new Card in the Dictionary
export function createCard(req, res) {
  if(req.body._id){
    delete req.body._id;
  }
  Dictionary.findOneAndUpdateAsync(
    {
      _id : req.params.id, 
      user_id : req.user._id
    }, 
    {$push : {cards : req.body}},
    {new : true})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Update a Card in the Dictionary
export function updateCard(req, res) {
  if(req.body._id){
    delete req.body._id;
  }
  var update = Object.keys(req.body).reduce((aggr, prop) => {
    aggr['cards.$.' + prop] = req.body[prop];
    return aggr;
  }, {});
  console.log('Update card: ' + JSON.stringify(update));
  Dictionary.findOneAndUpdateAsync(
    {
      _id : req.params.id, 
      user_id : req.user._id, 
      'cards._id' : req.params.cardId  
    },
    {$set : update },
    {new : true})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Delete a new Card in the Dictionary
export function destroyCard(req, res) {
    Dictionary.findOneAndUpdateAsync({
    _id : req.params.id, user_id : req.user._id}, 
    {$pull : {cards : {_id : req.params.cardId} } },
    {new : true})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
