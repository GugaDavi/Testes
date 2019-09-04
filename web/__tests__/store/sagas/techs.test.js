import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';

import api from '~/services/api';
import { getTechs } from '~/store/modules/techs/sagas';
import {
  getTechsSuccess,
  getTechsFailure,
} from '~/store/modules/techs/actions';

const apiMock = new MockAdapter(api);

describe('Techs Saga', () => {
  it('Should be able to fetch techs', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(200, ['Node.js']);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['Node.js']));
  });

  it('Should fail when api returns error', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(500);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
  });
});
