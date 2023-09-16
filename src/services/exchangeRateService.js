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

module.exports = {
    getCurrencies, getCurrencyByCode, getRealTimeRatesDefault, getRealTimeRates, convert
}