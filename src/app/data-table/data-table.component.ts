import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-data-table',
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  data$!: Observable<any>;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

   ngOnInit() {
    this.data$ = this.apiService.getData();
  }
 
}
