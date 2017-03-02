const db = require('../../mongodb/dbLink');
const resultModel = require('../../result_config/result');
const co = require('co');
const md5 = require('md5');
const express = require('express');
const router = express.Router();

module.exports = router;