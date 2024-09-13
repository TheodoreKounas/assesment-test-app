import { Action, createReducer, on } from '@ngrx/store';
import { loadData, loadDataSuccess, loadDataFailure } from './actions';
import { AppState, initialState } from './state';

//creates and loads the data
const _dataReducer = createReducer(
  initialState,
  on(loadData, state => ({ ...state, loading: true })),
  on(loadDataSuccess, (state, { data }) => ({ ...state, loading: false, data })),
  on(loadDataFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function dataReducer(state: AppState | undefined, action: Action) {
  return _dataReducer(state, action);
}
