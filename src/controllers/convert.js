const exchangeRateService = require('../services/exchangeRateService');
const { isPlainNumber } = require('../services/utils');

const convert = async (req, res) => {
    try {
        const { baseCurrency, targetCurrency, amount } = req.query;

        if (!baseCurrency || !targetCurrency || !amount) {
            res.status(400).json({ error: 'Invalid request. Please provide baseCurrency, targetCurrency, and amount in query parameters.' });
            return;
        }

        if (!isPlainNumber(amount)) {
            res.status(400).json({ error: 'Invalid request. Amount should be a number' });
            return;
        }

        if (amount <= 0) {
            res.status(400).json({ error: 'Invalid request. Amount should be greater than 0' });
            return;
        }

        const response = await exchangeRateService.convert(baseCurrency, targetCurrency, amount);

        res.status(200).json(response);

    } catch (e) {
        if (e.message.includes("not supported"))
            res.status(404).json(e.message);
        else
            res.status(500).send(e.message);
    }
}

const convertBatch = async (req, res) => {
    try {
        const conversions = req.body;

        if (!Array.isArray(conversions)) {
            res.status(400).json({ error: 'Invalid request. Please provide an array of conversion objects in the request body.' });
            return;
        }

        const results = await exchangeRateService.convertBatch(conversions);

        res.status(200).json(results);
    } catch (e) {
        if (e.message.includes("amou"))
            res.status(400).json(e.message);
        else if (e.message.includes("not supported"))
            res.status(404).json(e.message);
        else
            res.status(500).send(e.message);
    }
}

module.exports = {
    convert, convertBatch
};