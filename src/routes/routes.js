const router = require('express').Router();

const currenciesController = require('../controllers/currencies');
const realTimeRatesController = require('../controllers/realTimeRates');

router.get('/currencies', currenciesController.getCurrencies);
router.get('/currencies/:code', currenciesController.getCurrencyByCode);

router.get('/real-time-rates', realTimeRatesController.getRealTimeRatesDefault);
router.get('/real-time-rates/:code', realTimeRatesController.getRealTimeRates);

module.exports = router;

