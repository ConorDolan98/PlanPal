import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketmasterService {
  private apiKey = 'V1agOWvdvCgRwZW9QaFQjkSCRWNAf8Qx';
  private baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

  constructor(private http: HttpClient) {}

  getEventsByLocation(location: string): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('city', location);

    return this.http.get(this.baseUrl, { params });
  }

  getEventsLatLon(lat: number, lon: number): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('latlong', `${lat},${lon}`)
      .set('radius', '50');

    return this.http.get(this.baseUrl, { params });
  }
}
