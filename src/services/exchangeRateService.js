const thirdPartyService = require('./thirdPartyService');
const currencyDetails = require('../data/currencyDetails');
const utils = require('./utils');

const getCurrencies = async () => {
    const response = await thirdPartyService.getCurrencies();
    return response.data;
}

const getCurrencyByCode = (code) => {
    if (currencyDetails[code])
        return currencyDetails[code];
    return {};
}

const getRealTimeRatesDefault = async () => {
    const response = await thirdPartyService.getRealTimeRatesDefault();
    return utils.realTimeRatesConvertObj(response.data);
}

const getRealTimeRates = async (code) => {
    if (!currencyDetails[code])
        return {}

    const response = await thirdPartyService.getRealTimeRates(code);
    return utils.realTimeRatesConvertObj(response.data);
}

const convert = async (baseCurrency, targetCurrency, amount) => {
    const baseCurrencyRate = await getRealTimeRates(baseCurrency);

    if (Object.keys(getCurrencyByCode(baseCurrency)).length === 0) {
        throw new Error(`Base currency with code '${baseCurrency}' not supported`);
    }

    if (Object.keys(getCurrencyByCode(targetCurrency)).length === 0) {
        throw new Error(`Targert currency with code '${targetCurrency}' not supported`);
    }

    if (baseCurrency === targetCurrency)
        return {
            baseCurrency,
            targetCurrency,
            exchangeRate: 1,
            convertedAmount: amount,
            lastUpdated: new Date().toISOString().split('T')[0],
        };

    const exchangeRate = baseCurrencyRate.rates[targetCurrency];
    const convertedAmount = amount * exchangeRate;
    const lastUpdated = baseCurrencyRate.lastUpdated;

    return {
        baseCurrency,
        targetCurrency,
        exchangeRate,
        convertedAmount,
        lastUpdated,
    };
}

const convertBatch = async (batch) => {
    const results = [];

    for(const conversion of batch) {
        const { baseCurrency, targetCurrency, amount } = conversion;

        if (Object.keys(getCurrencyByCode(baseCurrency)).length === 0) {
            throw new Error(`Base currency with code '${baseCurrency}' not supported`);
        }
    
        if (Object.keys(getCurrencyByCode(targetCurrency)).length === 0) {
            throw new Error(`Targert currency with code '${targetCurrency}' not supported`);
        }

        if (!utils.isPlainNumber(amount)) {
            throw new Error('Amount should be a valid number');
        }

        if (amount <= 0) {
            res.status(400).json({ error: 'Invalid request. Amount should be greater than 0' });
            return;
        }

        const response = await convert(baseCurrency, targetCurrency, amount);
        results.push(response);
    }

    return results;
}

module.exports = {
    getCurrencies, getCurrencyByCode, getRealTimeRatesDefault, getRealTimeRates, convert, convertBatch
}