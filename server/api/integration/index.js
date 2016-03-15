'use strict';

var express = require('express');
var lexin = require('./lexin.controller');

var router = express.Router();

router.get('/translate/:word', lexin.translate);

module.exports = router;
