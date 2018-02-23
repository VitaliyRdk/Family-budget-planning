const router = require('express').Router();

router.use('/users',require('./users'));
router.use('/operations',require('./operations'));
module.exports = router
