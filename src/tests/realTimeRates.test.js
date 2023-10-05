const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Real Time Rates endpoints', () => {
    it('should get default real-time rates', (done) => {
        chai
            .request(app)
            .get('/real-time-rates')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('amount').to.be.a('number');
                expect(res.body).to.have.property('baseCurrency').equal('EUR'); //default
                expect(res.body).to.have.property('rates').to.be.an('object');
                expect(res.body).to.have.property('lastUpdated').to.be.a('string');

                done();
            });     
    });

    it('should get real-time rates for a specific currency', (done) => {
        const currencyCode = 'USD';
    
        chai
          .request(app)
          .get(`/real-time-rates/${currencyCode}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('amount').to.be.a('number');
            expect(res.body).to.have.property('baseCurrency').equal(currencyCode);
            expect(res.body).to.have.property('rates').to.be.an('object');
            expect(res.body).to.have.property('lastUpdated').to.be.a('string');
    
            done();
          });
      });
});