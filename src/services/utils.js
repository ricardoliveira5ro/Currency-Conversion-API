const realTimeRatesConvertObj = (obj) => {
    realTimeRatesObj = {
        'amount' : obj.amount,
        'baseCurrency' : obj.base,
        'lastUpdated' : obj.date,
        'rates' : obj.rates
    };

    return realTimeRatesObj
}

const isPlainNumber = (value) => {
    return /^\d+(\.\d+)?$/.test(value);
};

module.exports = {
    realTimeRatesConvertObj, isPlainNumber
}