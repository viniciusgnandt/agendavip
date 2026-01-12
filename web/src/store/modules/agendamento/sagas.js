import { takeLatest, all, call, put } from 'redux-saga/effects';
import { updateAgendamento } from './actions';
import types from './types';
import api from '../../../services/api';
import { notification } from '../../../services/rsuite';
import consts from '../../../consts';

// FILTRAR AGENDAMENTOS
export function* filterAgendamentos({ range }) {
  try {
    // CHAMADA A API
    const { data: res } = yield call(api.post, '/agendamento/filter', {
      salaoId: consts.salaoId,
      range,
    });

    // TRATAR ERRO
    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    // COLOCAR OS AGENDAMENTOS NO REDUCER
    yield put(updateAgendamento({ agendamentos: res.agendamentos }));
    
  } catch (err) {
    // COLOCAR AQUI O ALERT DO RSUITE
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export default all([takeLatest(types.FILTER_AGENDAMENTOS, filterAgendamentos)]);