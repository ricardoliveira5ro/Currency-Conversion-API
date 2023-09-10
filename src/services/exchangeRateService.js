const thirdPartyService = require('./thirdPartyService');
const currencyDetails = require('../data/currencyDetails');

const getCurrencies = async () => {
    const response = await thirdPartyService.getCurrencies();
    return response.data;
}

const getCurrencyByCode = async (code) => {
    if (currencyDetails[code])
        return currencyDetails[code];
    return {};
}

module.exports = {
    getCurrencies, getCurrencyByCode
}