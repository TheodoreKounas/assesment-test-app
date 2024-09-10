import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component'
import { FetchComponent } from './fetch.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DataTableComponent, FetchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'assesment-test-app';
}
