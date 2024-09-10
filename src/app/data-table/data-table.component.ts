import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-data-table',
  imports: [CommonModule, MatTableModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  displayedColumns: any[] = ['id', 'name', 'price', 'market_cap', 'total_volume', 'high_24h', 'low_24h', 'price_change_percentage_24h', 'circulating_supply'];
  data$!: Observable<any>;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

   ngOnInit() {
    this.data$ = this.apiService.getData();
  }
 
}
