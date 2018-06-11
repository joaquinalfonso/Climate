import { Component, OnInit } from '@angular/core';
import { Location } from '../../location';
import { IrrisatService } from '../../irrisat.service';
 
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  // location : Location;

  //hero = 'Windstorm';

  myLocation : Location = {
    name:"loca",
    latitude: 38.1,
    longitude: -1.3
  };

  et0 : object;

  constructor( private irrisatService : IrrisatService ) { }

  ngOnInit() {
      
   }

  localize() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
              this.myLocation.latitude = position.coords.latitude; 
              this.myLocation.longitude = position.coords.longitude;
      });
    }
}

  onClick() {
        //console.log("Lat: " + this.myLocation.latitude + " Lon: "+ this.myLocation.longitude);

        this.getEvapotranspiration();
  }

  getEvapotranspiration(): void {

    this.irrisatService.search(this.myLocation.latitude,this.myLocation.longitude)
    .then(
      (val) => {
      this.et0 = val;
      console.log(this.et0);
    },
      (err) => console.error(err)
    );
    
  }

}
