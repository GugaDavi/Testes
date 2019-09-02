import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Gustavo Davi',
        email: 'gustavo@dev.com.br',
        password_hash: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });

  // it('User must not be able to register with duplicate email', async () => {
  //   await request(app)
  //     .post('/users')
  //     .send({
  //       name: 'Gustavo Davi',
  //       email: 'gustavo@dev.com.br',
  //       password_hash: '123456',
  //     });

  //   const response = await request(app)
  //     .post('/users')
  //     .send({
  //       name: 'Gustavo Davi',
  //       email: 'gustavo@dev.com.br',
  //       password_hash: '123456',
  //     });

  //   expect(response.status).toBe(400);
  // });
});
