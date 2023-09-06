const axios = require('axios');

const ENDPOINT = 'https://api.frankfurter.app/currencies'

const getCurrencies = async () => {
    try {
        //const data = null; 
        
        axios.get(ENDPOINT).then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error(error);
        });

        return {};
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getCurrencies
}