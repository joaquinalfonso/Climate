import { Component, OnInit } from '@angular/core';
import { Location } from '../../location';
import { IrrisatService } from '../../irrisat.service';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

 
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  // location : Location;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  myLocation : Location = {
    name:"loca",
    latitude: null,
    longitude: null
  };

  et0 : object;

  constructor( private irrisatService : IrrisatService ) { }

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(this.myLocation.latitude, this.myLocation.longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
   }

  localize() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
              this.myLocation.latitude = position.coords.latitude; 
              this.myLocation.longitude = position.coords.longitude;
      });

      this.setCenter();
    }
}

  onClick() {
        //console.log("Lat: " + this.myLocation.latitude + " Lon: "+ this.myLocation.longitude);

        this.getEvapotranspiration();
        this.setCenter();
  }

  getEvapotranspiration(): void {

    this.irrisatService.search(this.myLocation.latitude,this.myLocation.longitude).then((val) => {
      this.et0 = val;
      //console.log(this.et0);
    },
      (err) => console.error(err)
    );
    
  }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.myLocation.latitude, this.myLocation.longitude));

    let location = new google.maps.LatLng(this.myLocation.latitude, this.myLocation.longitude);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Got you!'
    });

    marker.addListener('click', this.simpleMarkerHandler);

    marker.addListener('click', () => {
      this.markerHandler(marker);
    });
    
  }

  simpleMarkerHandler() {
    alert('Simple Component\'s function...');
  }

  markerHandler(marker: google.maps.Marker) {
    alert('Marker\'s Title: ' + marker.getTitle());
  }

}
