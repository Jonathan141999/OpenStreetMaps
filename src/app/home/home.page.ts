import { Component } from '@angular/core';
import * as L from "leaflet";
import { Map } from '../shared/Map';
import { MapService } from './../shared/map.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: L.Map;
  tempIcon: any;
  point: any;
  Bookings = [];

  constructor(private aptService: MapService) {}

  ngOnInit() {

    this.map = L.map('map', {
      center: [ -0.225219, -78.5248 ],
      zoom: 15,
      renderer: L.canvas()
    },
    )

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // maxZoom: 12,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map)

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

    this.tempIcon = L.icon({
      iconUrl: 'assets/icon/favicon.png',
      shadowUrl: '',
      iconSize: [32, 32], 
      shadowSize: [0, 0], 
      iconAnchor: [32, 32], 
      shadowAnchor: [0, 0], 
      popupAnchor: [32, 20] 
    });
        this.map.on('click', (e) => { this.onMapClick(e) });



    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe((res) => {
      this.Bookings = [];
      res.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Map);
      });
    });
  }

  onMapClick(e) {
    let tempMarker = L.marker(e.latlng, { icon: this.tempIcon })
    .on('click', this.showMarkerMenu, this) 
    .addTo(this.map);
    console.log("Pulsada la coordenada: " + e.latlng);
    this.point = e.latlng;
    console.log('point', this.point);
    }
  showMarkerMenu() {
    console.log("Se ha pulsado click en un marcador puesto.");
  } 


  fetchBookings() {
    this.aptService
      .getBookingList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }

  sendPoint() {
      this.aptService
        .createBooking(this.point)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
  }

  

}
