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

const getCurrencyByCode = async (req, res) => {
    try {
        const code = req.params.code;
        const currency = await exchangeRateService.getCurrencyByCode(code);
        
        if (Object.keys(currency).length === 0) {
            res.status(404).json({ error: `Currency with code '${code}' not found` });
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