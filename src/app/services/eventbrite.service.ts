import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventbriteService {
  private apiToken = 'STK4FM3LLTLESTV7TPKT'; // Replace with your actual private token
  private baseUrl = 'https://www.eventbriteapi.com/v3/events/search/';

  constructor(private http: HttpClient) {}

  getEventsByLocation(location: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiToken}`
    });

    const params = new HttpParams()
      .set('location.address', location);

    return this.http.get(this.baseUrl, { headers, params });
  }
}
