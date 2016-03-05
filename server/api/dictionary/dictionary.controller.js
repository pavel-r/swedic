/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/dictionarys              ->  index
 * POST    /api/dictionarys              ->  create
 * GET     /api/dictionarys/:id          ->  show
 * PUT     /api/dictionarys/:id          ->  update
 * DELETE  /api/dictionarys/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Dictionary from './dictionary.model';
import DictionaryByUser from './dictionary.by.user.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function transformToDictionarys(res) {
  return function(entity){
    return entity.dictionarys;
  };
}

function handleDictionaryByUserNotFound(req){
  var userId = req.user._id;
  return function(dictionaryByUser){
    if(!dictionaryByUser){
      return DictionaryByUser.createAsync({_id : userId, dictionarys : []});
    }
    return dictionaryByUser;
  }
}

function addDictionaryToDictionaryByUserAndSave(entity){
  return function(dictionaryByUser) {
    dictionaryByUser.dictionarys.push({
      dictionary_id : entity._id,
      name : entity.name
    });
    dictionaryByUser.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function addDictionaryByUser(req){
  var userId = req.user._id;
  return function(entity){
    return DictionaryByUser.findByIdAsync(userId)
      .then(handleDictionaryByUserNotFound(req))
      .then(addDictionaryToDictionaryByUserAndSave(entity))
      .then(dictionaryByUser => {
        return entity;
      });
  }
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Dictionarys
export function index(req, res) {
  DictionaryByUser.findByIdAsync(req.user._id)
        .then(transformToDictionarys(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
  // Dictionary.findAsync()
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

// Gets a single Dictionary from the DB
export function show(req, res) {
  Dictionary.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Dictionary in the DB
export function create(req, res) {
  Dictionary.createAsync(req.body)
    .then(addDictionaryByUser(req))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Dictionary in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Dictionary.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Dictionary from the DB
export function destroy(req, res) {
  Dictionary.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
