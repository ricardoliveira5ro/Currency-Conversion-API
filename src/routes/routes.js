const router = require('express').Router();

const currenciesController = require('../controllers/currencies');

router.get('/currencies', currenciesController.getCurrencies);
router.get('/currencies/:code', currenciesController.getCurrencyByCode);

module.exports = router;

