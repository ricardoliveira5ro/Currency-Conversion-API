const axios = require('axios');
const currencyDetails = require('../data/currencyDetails');

const ENDPOINT = 'https://api.frankfurter.app/currencies';

const getCurrencies = async () => {
    try {
        const response = await axios.get(ENDPOINT);
        return response.data;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getCurrencyByCode = async (code) => {
    if (currencyDetails[code])
        return currencyDetails[code];
    return {};
}

module.exports = {
    getCurrencies, getCurrencyByCode
}