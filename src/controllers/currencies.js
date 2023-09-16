const exchangeRateService = require('../services/exchangeRateService');

const getCurrencies = async (req, res) => {
    try {
        const currencies = await exchangeRateService.getCurrencies();
        res.status(200).json(currencies);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}

const getCurrencyByCode = (req, res) => {
    try {
        const code = req.params.code;
        const currency = exchangeRateService.getCurrencyByCode(code);
        
        if (Object.keys(currency).length === 0) {
            res.status(404).json({ error: `Currency with code '${code}' not supported` });
        } else {
            res.status(200).json(currency);
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = {
    getCurrencies, getCurrencyByCode
}