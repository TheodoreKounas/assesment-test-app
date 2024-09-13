import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadData } from './actions';

@Component({
    standalone: true,
    selector: 'fetch-btn',
    templateUrl: './fetch.component.html',
    styleUrl: './fetch.component.css'
})
export class FetchComponent {
  constructor(private store: Store) {}
//tester that shows if it works
  fetchData() {
    this.store.dispatch(loadData());
    console.log(loadData());
  }
}
