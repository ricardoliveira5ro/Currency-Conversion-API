const router = require('express').Router();

const currenciesController = require('../controllers/currencies');



router.get('/currencies', currenciesController.getCurrencies);

module.exports = router;

