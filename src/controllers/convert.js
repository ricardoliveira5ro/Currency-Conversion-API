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

        const response = await exchangeRateService.convert(baseCurrency, targetCurrency, amount);

        res.status(200).json(response);

    } catch (e) {
        if (e.message.includes("not supported"))
            res.status(404).json(e.message);
        else
            res.status(500).send(e.message);
    }
}

module.exports = {
    convert
};