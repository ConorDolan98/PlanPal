import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventbriteService {

  private readonly BASE_URL = 'https://www.eventbriteapi.com/v3/events/search/';
  private readonly TOKEN = 'STK4FM3LLTLESTV7TPKT'; // your private OAuth token

  constructor(private http: HttpClient) {}

  getEventsByLocation(location: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`
    });

    const url = `${this.BASE_URL}?location.address=${encodeURIComponent(location)}&expand=venue`;
    console.log('Eventbrite API Request:', url);

    return this.http.get(url, { headers });
  }
}
