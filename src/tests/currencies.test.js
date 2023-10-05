const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Currencies endpoints', () => {
    it('should return a list of currencies', (done) => {
      chai
        .request(app)
        .get('/currencies')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(Object.keys(res.body).length).to.equal(31);
          done();
        });
    });

    it('should return a specific currency by code', (done) => {
        const currencyMock = {
          code: 'USD',
          symbol: '$',
          country: 'United States Of America'
        };
    
        chai
          .request(app)
          .get(`/currencies/${currencyMock.code}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('Code').equal(currencyMock.code);
            expect(res.body).to.have.property('Symbol').equal(currencyMock.symbol);
            expect(res.body).to.have.property('Country').equal(currencyMock.country);
            done();
          });
    });
});