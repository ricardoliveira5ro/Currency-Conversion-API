const realTimeRatesConvertObj = (obj) => {
    realTimeRatesObj = {
        'Amount' : obj.amount,
        'Base-Currency' : obj.base,
        'Last-Updated' : obj.date,
        'Rates' : obj.rates
    };

    return realTimeRatesObj
}

module.exports = {
    realTimeRatesConvertObj
}