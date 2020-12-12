import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage {

  map: any;
  marker: any;
  latitude: any = "";
  longitude: any = "";
  timestamp: any = "";

  constructor(public platform: Platform, public geolocation: Geolocation) {
    this.platform.ready().then(() => {
      var mapOptions = {
        //-0.180376, -78.469957
        center: { lat: -0.280376, lng: -78.469957 },
        zoom: 14
      }
      this.map = new google.maps.Map(document.getElementById
        ("map"), mapOptions);
      //this.GetLocation();
    })
  }
  
  GetLocation() {
    var ref = this;
    let watch = this.geolocation.watchPosition();
    watch.subscribe((position) => {
      var gps = new google.maps.LatLng
        (position.coords.latitude, position.coords.longitude);
      if (ref.marker == null) {
        ref.marker = new google.maps.Marker({
          position: gps,
          map: ref.map,
          title: 'my postion'
        })
      }
      else {
        ref.marker.setPosition(gps);

      }
      ref.map.panTo(gps);
      ref.latitude = position.coords.latitude.toString();
      ref.longitude = position.coords.longitude.toString();
      ref.timestamp = (new Date(position.timestamp)).toString();
    })
  }


}
