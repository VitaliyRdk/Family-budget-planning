const express = require('express');
const router = express.Router();
const operations = require('./../services/operations');

router.get('/statistic', operations.getStatistic);
router.get('/', operations.getAll);
router.get('/:id', operations.getById);
router.put('/:id', operations.modify);
router.post('/', operations.insert);
module.exports = router;
