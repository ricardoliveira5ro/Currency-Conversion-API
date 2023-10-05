const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Convert endpoints', () => {
    it('should convert an amount received in base currency to a target currency', (done) => {
        const baseCurrency = 'USD';
        const targetCurrency = 'EUR';
        const amount = 100;

        chai
            .request(app)
            .post('/convert')
            .query({baseCurrency, targetCurrency, amount})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('baseCurrency').equal(baseCurrency);
                expect(res.body).to.have.property('targetCurrency').equal(targetCurrency);
                expect(res.body).to.have.property('exchangeRate').to.be.a('number');
                expect(res.body).to.have.property('convertedAmount').to.be.a('number');
                expect(res.body).to.have.property('lastUpdated').to.be.a('string');
                
                done();
            });
    });


    it('should convert a batch of currencies', (done) => {
        const batch = [
            { baseCurrency: 'USD', targetCurrency: 'EUR', amount: 100 },
            { baseCurrency: 'GBP', targetCurrency: 'JPY', amount: 2000 },
        ];

        chai
            .request(app)
            .post('/convert-batch')
            .send(batch)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');

                for (let i = 0; i < res.body.length; i++) {
                    const result = res.body[i];
            
                    expect(result).to.be.an('object');
                    expect(result).to.have.property('baseCurrency').to.equal(batch[i].baseCurrency);
                    expect(result).to.have.property('targetCurrency').to.equal(batch[i].targetCurrency);
                    expect(result).to.have.property('exchangeRate').to.be.a('number');
                    expect(result).to.have.property('convertedAmount').to.be.a('number');
                    expect(result).to.have.property('lastUpdated').to.be.a('string');
                }
                
                done();
            });
    });
});