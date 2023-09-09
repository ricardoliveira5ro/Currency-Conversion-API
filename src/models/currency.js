class Currency {
    constructor (code, name, symbol = '', country = '', subunit = '', subunit_ratio = '') {
        this.code = code;
        this.name = name;
        this.symbol = symbol;
        this.country = country;
        this.subunit = subunit;
        this.subunit_ratio = subunit_ratio;
    }
}

module.exports = Currency;