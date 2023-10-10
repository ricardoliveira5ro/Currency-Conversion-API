const router = require('express').Router();

const currenciesController = require('../controllers/currencies');
const realTimeRatesController = require('../controllers/realTimeRates');
const convertController = require('../controllers/convert');

router.get('/', (req, res) => {
    const apiInfo = {
      name: 'Currency Conversion API',
      version: '1.0.0',
      description: 'A RESTful API for currency conversion',
      author: 'Ricardo Oliveira',
    };
  
    res.status(200).json(apiInfo);
});

router.get('/currencies', currenciesController.getCurrencies);
router.get('/currencies/:code', currenciesController.getCurrencyByCode);

router.get('/real-time-rates', realTimeRatesController.getRealTimeRatesDefault);
router.get('/real-time-rates/:code', realTimeRatesController.getRealTimeRates);

router.post('/convert', convertController.convert);
router.post('/convert-batch', convertController.convertBatch);

module.exports = router;