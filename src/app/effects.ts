import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { loadData, loadDataSuccess, loadDataFailure } from './actions';

@Injectable()
export class DataEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadData),
      mergeMap(() =>
        this.apiService.getData().pipe(
          map(data => loadDataSuccess({ data })),
          catchError(error => of(loadDataFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
