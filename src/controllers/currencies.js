const usersService = require('../services/users');

const getCurrencies = async (req, res) => {
    try {
        const currencies = await usersService.getCurrencies();
        res.status(200).json(currencies);
    }
    catch (e) {
        res.status(500).send(e);
    }
}

module.exports = {
    getCurrencies
}