import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { FetchComponent } from './fetch.component';
import { ChartGraphComponent } from './charts/chart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DataTableComponent, FetchComponent, ChartGraphComponent, MatTabsModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'assesment-test-app';
}
