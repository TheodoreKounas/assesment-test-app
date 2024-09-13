import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-data-table',
  imports: [CommonModule, MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatPaginator],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit, AfterViewInit  {
  
  displayedColumns: any[] = ['id', 'name', 'symbol', 'price', 'market_cap', 'total_volume', 'high_24h', 'low_24h', 'price_change_percentage_24h', 'circulating_supply'];
  //initiating my variables for filtering the data accross the tables and it's filters
  dataSource = new MatTableDataSource<any>();
  data$!: Observable<any>;
  error: string | null = null;
  uniqueNames: any[] = [];
  uniqueSymbols: any[] = [];
  uniqueMarketCaps: any[] = [];
  selectedName: any | null = null;
  selectedSymbol: any | null = null;
  selectedMarketCap: any | null = null;


  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }
  // using the @viewChild for instatiating the paginator and the sorting with the table
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
 
  ngOnInit() {
    //on init we get the data from the api and pass it throught the material data source
    this.data$ = this.apiService.getData();
    this.data$.subscribe(data => {
      this.dataSource.data = data;
      //the use of uniques is for the filters 
      this.uniqueNames = [...new Set(data.map(item => item.name))];
      this.uniqueSymbols = [...new Set(data.map(item => item.symbol))];
      this.uniqueMarketCaps = [...new Set(data.map(item => item.market_cap))];
    });
    // using the filterPredicate for custom filtering accorind to our needs
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const matchFilter = [];
      return matchFilter.some(Boolean);
  }
  }
  ngAfterViewInit() {
    //because our data are async we instatiate the DOM in AfterViewInit so that the data have been loaded firstly
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, header) => data[header];

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = Object.keys(data).reduce((currentTerm, key) => {
        return currentTerm + (data[key] + ' ').toLowerCase();}, '').trim();
        return dataStr.indexOf(filter) != -1;
    };
    
    this.cdr.detectChanges();
}
//dynamic search through the table data
applySearch(event?: Event) {
  const filterValue = event ? (event.target as HTMLInputElement).value : '';
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
//this function describes the filtering process and also when clicking again the same filter to unselect but it bugs out
applyFilter(event: any, column: string) {
  const filterValue = event.value;
  if (column === 'name') {
    this.selectedName = this.selectedName === filterValue ? null : filterValue;
  } else if (column === 'symbol') {
    this.selectedSymbol = this.selectedSymbol === filterValue ? null : filterValue;
  }else if (column === 'market_cap') {
    this.selectedMarketCap = this.selectedMarketCap === filterValue ? null : filterValue;
  }

  this.dataSource.filterPredicate = (data: any, filter: string) => {
    if (this.selectedName && this.selectedSymbol && this.selectedMarketCap) {
      return data.name === this.selectedName && data.symbol === this.selectedSymbol && data.market_cap === this.selectedMarketCap;
    } else if (this.selectedName) {
      return data.name === this.selectedName;
    } else if (this.selectedSymbol) {
      return data.symbol === this.selectedSymbol;
    } else if (this.selectedMarketCap) {
      return data.market_cap === this.selectedMarketCap;
    }
    return true;
  };

  this.dataSource.filter = filterValue ? filterValue : '';
}

}

