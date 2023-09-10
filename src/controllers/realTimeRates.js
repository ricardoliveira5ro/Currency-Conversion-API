const exchangeRateService = require('../services/exchangeRateService');

const getRealTimeRatesDefault = async (req, res) => {
    try {
        const rates = await exchangeRateService.getRealTimeRatesDefault();
        res.status(200).json(rates);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}

const getRealTimeRates = async (req, res) => {
    try {
        const code = req.params.code;
        const rates = await exchangeRateService.getRealTimeRates(code);

        if (Object.keys(rates).length === 0) {
            res.status(404).json({ error: `Real time rates for currency with code '${code}' not supported` });
        } else {
            res.status(200).json(rates);
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = {
    getRealTimeRatesDefault, getRealTimeRates
}