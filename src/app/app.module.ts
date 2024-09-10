import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dataReducer } from './reducers';
import { DataEffects } from './effects';

@NgModule({
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    HighchartsChartModule,
    StoreModule.forRoot({ data: dataReducer }),
    EffectsModule.forRoot([DataEffects])
  ],
  providers: [ApiService]
})
export class AppModule { }