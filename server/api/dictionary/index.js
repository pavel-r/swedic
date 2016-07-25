'use strict';

var express = require('express');
var controller = require('./dictionary.controller');
var auth = require('../../auth/auth.service');
var upload = require('../../upload/upload.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/upload', auth.isAuthenticated(), upload.fileToReqBody(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/reset', auth.isAuthenticated(), controller.reset);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.post('/:id/cards', auth.isAuthenticated(), controller.createCard);
router.put('/:id/cards/:cardId', auth.isAuthenticated(), controller.updateCard);
router.delete('/:id/cards/:cardId', auth.isAuthenticated(), controller.destroyCard);

module.exports = router;
