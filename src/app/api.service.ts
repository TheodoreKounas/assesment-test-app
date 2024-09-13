import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false';
  
    constructor(private http: HttpClient) { }
    //api call with the parameter of currency for the columns e.g. price and marketcap
    getData(): Observable<any> {
      return this.http.get<any>(this.apiUrl, {params: {vs_currency: 'usd'}});
    }
   
  }

  