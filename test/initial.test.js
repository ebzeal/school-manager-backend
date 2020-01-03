import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('initial test for default route', () => {
  it('should return home route', async () => {
    const response = await chai.request(app).get('/');

    expect(response.body).to.be.equal('This is School Manager');
    expect(response).to.have.status(200);
  });

  it('should return failure for undefined route', async () => {
    const response = await chai.request(app).get('/myundefined');

    expect(response.body).to.be.equal('Route does not exist');
    expect(response).to.have.status(400);
  });
});
