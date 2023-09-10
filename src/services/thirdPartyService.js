const axios = require('axios');

const FRANKFURTER_API = 'https://api.frankfurter.app';

const getCurrencies = async () => {
    try {
        return response = await axios.get(FRANKFURTER_API + '/currencies');

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getCurrencies
}