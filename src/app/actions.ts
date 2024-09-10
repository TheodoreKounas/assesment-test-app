import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[API] Load Data');
export const loadDataSuccess = createAction('[API] Load Data Success', props<{ data: any[] }>());
export const loadDataFailure = createAction('[API] Load Data Failure', props<{ error: any }>());