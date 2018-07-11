import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../../location';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  @Input() detail: object; 

  currentClasses: {};

  constructor() { 
    console.log("Hello location-detail");
  }

  ngOnInit() {
    console.log("Hello location-detail");
    //console.log(this.detail);
    
    // this.detail.array.forEach(element => {
      
    // });
  }


  ngOnChanges(changes: {[propKey: string]: any}) {
    console.log(changes);

    this.lineChartLabels = [];
    this.lineChartData[0].data = [];
    this.lineChartDataPrecipitation[0].data = [];


    // let log: string[] = [];
    for (let propName in changes) {
        /*
       let changedProp = changes[propName];
       let to = JSON.stringify(changedProp.currentValue);
       console.log(to);

       var objectKeys = Object.keys(this.detail);
       console.log("objectKeys: ", objectKeys);

       console.log('======= Object.keys ==========');
        Object.keys(this.detail).map(e => {
        console.log(`key= ${e} value = ${this.detail[e]}`)        
        });*/

      console.log('======= Object.entries ==========');
        Object.entries(this.detail).forEach(([key, value]) => {
          if(key === "Daily")
          {
            //console.log(`key= ${key} value = ${value}`)
            Object.entries(value).forEach(([key2, value2]) => {
              //console.log(`key= ${key2} value = ${value2}`)    
              
              Object.entries(value2).forEach(([key3, value3]) => {
                if(key3=='Date') {              
                  //console.log(`key= ${key3} value = ${value3}`)    
                  let date = new Date(value3);
                  this.lineChartLabels.push(date.getDate());
                }
                if(key3=='ET0') {              
                  //console.log(`key= ${key3} value = ${value3}`)      
                  this.lineChartData[0].data.push(value3);                    
                }

                if(key3=='PrecipProbability'){              
                  //console.log(`key= ${key3} value = ${value3}`)      
                  this.lineChartDataPrecipitation[0].data.push(value3);                    
                }
              

              });
            });
          }
        });

    //   if (changedProp.isFirstChange()) {
    //     log.push(`Initial value of ${propName} set to ${to}`);
    //   } else {
    //     let from = JSON.stringify(changedProp.previousValue);
    //     log.push(`${propName} changed from ${from} to ${to}`);
    //   }
    }
    // this.changeLog.push(log.join(', '));
  }

  public lineChartData:Array<any> = [
    {data: [], label: 'Et0'},    
  ];

  
  public lineChartDataPrecipitation:Array<any> = [
    {data: [], label: '% Precipitation'},    
  ];


  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(255,0,0,0.2)',
      borderColor: 'rgba(255,0,0,1)',
      pointBackgroundColor: 'rgba(255,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,0.8)'
    }
  ];

  public lineChartColorsPrecipitation:Array<any> = [
    { // grey
      backgroundColor: 'rgba(0,0,255,0.2)',
      borderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: 'rgba(0,0,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,255,0.8)'
    }
  ];
  
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
  
  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }
  
  public chartHovered(e:any):void {
    //console.log(e);
  }

}
