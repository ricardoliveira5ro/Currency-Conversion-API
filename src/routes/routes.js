const router = require('express').Router();

const currenciesController = require('../controllers/currencies');
const realTimeRatesController = require('../controllers/realTimeRates');
const convertController = require('../controllers/convert');

router.get('/currencies', currenciesController.getCurrencies);
router.get('/currencies/:code', currenciesController.getCurrencyByCode);

router.get('/real-time-rates', realTimeRatesController.getRealTimeRatesDefault);
router.get('/real-time-rates/:code', realTimeRatesController.getRealTimeRates);

router.post('/convert', convertController.convert);
router.post('/convert-batch', convertController.convertBatch);

module.exports = router;