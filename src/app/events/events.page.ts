import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonText, IonCardSubtitle
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { TicketmasterService } from '../services/ticketmaster.service';
import { EventbriteService } from '../services/eventbrite.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonCardSubtitle,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton,
    IonGrid, IonRow, IonCol
  ]
})
export class EventsPage implements OnInit {
  ticketmasterEvents: any[] = [];
  eventbriteEvents: any[] = [];
  location: string = 'Dublin'; // Default fallback location

  constructor(
    private ticketmasterService: TicketmasterService,
    private eventbriteService: EventbriteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.location = params['location'] || this.location;
      this.getTicketmasterEvents();
      this.getEventbriteEvents();

      this.testEventbriteData();
    });
  }

  // getTicketmasterEvents method sort by location
  getTicketmasterEvents() {
    this.ticketmasterService.getEventsByLocation(this.location).subscribe({
      next: (res: any) => {
        this.ticketmasterEvents = res._embedded?.events || [];
        console.log('Ticketmaster Events:', this.ticketmasterEvents);
      },
      error: err => console.error('Ticketmaster API error:', err)
    });
  }

  // getEventbriteEvents method sort by location
  getEventbriteEvents() {
    this.eventbriteService.getEventsByLocation(this.location).subscribe(res => {
      console.log('Eventbrite:', res);
      this.eventbriteEvents = res.events || [];
    });
    
  }

  // Test Eventbrite with hardcoded data
  testEventbriteData() {
    this.eventbriteEvents = [
      {
        name: { text: 'Sample Tech Conference' },
        start: { local: '2025-06-20T10:00:00' },
        venue: { address: { localized_address_display: 'Galway, Ireland' } },
        url: 'https://www.eventbrite.com/e/sample-tech-conference-123456789'
      },
      {
        name: { text: 'Art & Music Fair' },
        start: { local: '2025-06-22T14:00:00' },
        venue: { address: { localized_address_display: 'Cork, Ireland' } },
        url: 'https://www.eventbrite.com/e/art-music-fair-987654321'
      }
    ];
  }
}
