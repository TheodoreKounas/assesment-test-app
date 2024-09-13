import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
@Component({
    standalone: true,
    selector: 'chart-graph',
    imports: [CommonModule, HighchartsChartModule],
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
  })

  export class ChartGraphComponent implements  OnInit, AfterViewInit  {
    //initiating the variables for the chart using the Highcharts lib
    data$!: Observable<any>;
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions!: Highcharts.Options;
    topCoins: any[] = [];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    //on init we bind our data to the chart and instatiate the proccesses
    this.data$ = this.apiService.getData();
    this.data$.subscribe((data: any[]) => {
        this.topCoins = data.slice(0, 10);
        this.setCustomTheme();
        this.createChart();
        this.cdr.detectChanges();
      });
      
    }

    ngAfterViewInit() {
      // call of the function to create the chart again here because of the async data
        this.createChart();
    }
    setCustomTheme() {
      //using the doc of highcharts s u can change the theme using these options
      const customTheme = {
        colors: ['#eedee7', '#f45b5b', '#91e8e1', '#7798BF', '#aaeeee'],
        chart: {
          backgroundColor: '#0D1217',
          style: {
            fontFamily: '\Inter\', sans-serif'
          },
          plotBorderColor: '#606063'
        },
        title: {
          style: {
            color: '#9eb0c7',
            textTransform: 'uppercase',
            fontSize: '16px'
          }
        },
        subtitle: {
          style: {
            color: '#9eb0c7',
            textTransform: 'uppercase'
          }
        },
        xAxis: {
          gridLineColor: '#9eb0c7',
          labels: {
            style: {
              color: '#eedee7'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          title: {
            style: {
              color: '#9eb0c7'
            }
          }
        },
        yAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          title: {
            style: {
              color: '#9eb0c7'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: {
            color: '#9eb0c7'
          }
        },
        plotOptions: {
          series: {
            dataLabels: {
              color: '#B0B0B3'
            },
            marker: {
              lineColor: '#333'
            }
          },
          boxplot: {
            fillColor: '#505053'
          },
          candlestick: {
            lineColor: 'white'
          },
          errorbar: {
            color: 'white'
          }
        },
        legend: {
          itemStyle: {
            color: '#E0E0E3'
          },
          itemHoverStyle: {
            color: '#FFF'
          },
          itemHiddenStyle: {
            color: '#606063'
          }
        },
        credits: {
          style: {
            color: '#666'
          }
        },
        labels: {
          style: {
            color: '#707073'
          }
        }
      };
  
      // Applies the theme
      Highcharts.setOptions(customTheme);
    }
    
        createChart() {
          //coindata is the interface where we add the extra info for the tooltip
          interface CoinData {
            y: number;
            volume: number;
            change: number;
          }
          const seriesData: CoinData[] = this.topCoins.map(coin => ({
            y: coin.market_cap,
            volume: coin.total_volume,
            change: coin.price_change_percentage_24h
          }));
          const categories = this.topCoins.map(coin => coin.name);
          const data = this.topCoins.map(coin => coin.market_cap);
          //the if is to make sure that there is no empty data
          if(categories.length && data.length) {
            this.chartOptions = {
              chart: {
                type: 'column'
              },
              title: {
                text: 'Top 10 Cryptocurrencies by Market Capitalization'
              },
              xAxis: {
                categories: this.topCoins.map(coin => coin.name),
                title: {
                  text: 'Cryptocurrency'
                }
              },
              yAxis: {
                min: 0,
                title: {
                  text: 'Market Capitalization (USD)'
                }
              },
              series: [{
                type: 'column',
                name: 'Market Cap',
                data: seriesData
              }],
              tooltip: {
                useHTML: true, 
                formatter: function () {
                  //use of the unknown to bypass the bug that does not recognises the coindata interface
                  const point = this.point as unknown as CoinData;
                  return `
                    <strong>${this.x}</strong><br/>
                    Market Cap: <strong>$${Highcharts.numberFormat(this.y, 0)}</strong><br/>
                    Volume: <strong>${Highcharts.numberFormat(point.volume, 0)}</strong><br/>
                    24h Change: <strong>${point.change}%</strong>
                  `;
                }
              }
            };
            this.cdr.detectChanges();
          }
        }
}