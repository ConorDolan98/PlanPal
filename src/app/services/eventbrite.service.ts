import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//unable to fix issues with authenticating api request
export class EventbriteService {
  private apiUrl = 'https://www.eventbriteapi.com/v3/events/search/';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer 7KPI5W3LZOU4JEXBAH'
  });

  constructor(private http: HttpClient) {}

  /*
  getEvents(location: string): Observable<any> {
    const url = `${this.apiUrl}?location.address=${encodeURIComponent(location)}&expand=venue`;
    return this.http.get(url, { headers: this.headers });
  }
  */

  getEvents(location: string): Observable<any> {
    return of(this.testEvents());
  }

  //Fake events to show ui functionality
  testEvents(): any {
    return {
      events: [
        {
          name: { text: 'Yoga' },
          start: { local: '2025-06-03' },
          venue: { name: 'TownHall' }
        },
        {
          name: { text: 'Tech Conference' },
          start: { local: '2025-06-05' },
          venue: { name: 'Dublin Theatre' }
        },
        {
          name: { text: 'Music Festival' },
          start: { local: '2025-06-07' },
          venue: { name: 'Cork Square' }
        }
      ]
    };
  }
}
