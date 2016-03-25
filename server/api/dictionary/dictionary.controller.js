/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/dictionarys              ->  index
 * POST    /api/dictionarys              ->  create
 * GET     /api/dictionarys/:id          ->  show
 * PUT     /api/dictionarys/:id          ->  update
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


function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
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

function validateUserId(userId){
  return function(entity){
    if(entity){
      if(!userId.equals(entity.user_id)){
        return null;
      }
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

function createCardForDictionary(card){
  return function(entity){
    entity.cards.push(card);
    return entity;
  };
}

function removeCardFromDictionary(cardId){
  return function(entity){
    entity.cards.pull({_id : cardId});
    return entity;
  };
}

function updateCardInDictionary(cardId, update){
  return function(entity){
    _.merge(entity.cards.id(cardId), update);
    return entity;
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
  Dictionary.findByIdAsync(req.params.id, projection)
    .then(validateUserId(req.user._id))
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
  Dictionary.findByIdAsync(req.params.id)
    .then(validateUserId(req.user._id))
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Dictionary from the DB
export function destroy(req, res) {
  Dictionary.findByIdAsync(req.params.id)
    .then(validateUserId(req.user._id))
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Create a new Card in the Dictionary
export function createCard(req, res) {
  if(req.body._id){
    delete req.body._id;
  }
  Dictionary.findByIdAsync(req.params.id)
    .then(validateUserId(req.user._id))
    .then(handleEntityNotFound(res))
    .then(createCardForDictionary(req.body))
    .then(saveUpdates())
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Update a Card in the Dictionary
export function updateCard(req, res) {
  if(req.body._id){
    delete req.body._id;
  }
  Dictionary.findByIdAsync(req.params.id)
    .then(validateUserId(req.user._id))
    .then(handleEntityNotFound(res))
    .then(updateCardInDictionary(req.params.cardId, req.body))
    .then(saveUpdates())
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Delete a new Card in the Dictionary
export function destroyCard(req, res) {
  Dictionary.findByIdAsync(req.params.id)
    .then(validateUserId(req.user._id))
    .then(handleEntityNotFound(res))
    .then(removeCardFromDictionary(req.params.cardId))
    .then(saveUpdates())
    .then(respondWithResult(res))
    .catch(handleError(res));
}
