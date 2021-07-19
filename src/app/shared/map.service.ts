import { Injectable } from '@angular/core';
import { Map } from '../shared/Map';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  createBooking(apt: Map) {
    console.log(apt.lat);
    console.log(apt.lng);
    return this.bookingListRef.push({
      lat: apt.lat,
      lng: apt.lng,
    });
  }

  getBookingList() {
    this.bookingListRef = this.db.list('/ubicacion');
    return this.bookingListRef;
  }
}
