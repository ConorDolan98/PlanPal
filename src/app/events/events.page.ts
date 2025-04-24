import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonText, IonCardSubtitle, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { TicketmasterService } from '../services/ticketmaster.service';
//import { EventbriteService } from '../services/eventbrite.service';
import { FavouritesService } from '../services/favourites.service';
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: true,
  imports: [IonIcon, 
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonCardSubtitle,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton,
    IonGrid, IonRow, IonCol
  ]
})
export class EventsPage implements OnInit {
  ticketmasterEvents: any[] = [];
  eventbriteEvents: any[] = [];
  location: string = 'Dublin'; // Default location
  genre: string = '';

  constructor(
    private ticketmasterService: TicketmasterService,
    //private eventbriteService: EventbriteService,
    private favouritesService: FavouritesService,
    private toastController: ToastController,

    private route: ActivatedRoute
  ) {}

  //ngOnInit outputs data to cards
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.location = params['location'] || 'Dublin';
      this.genre = params['genre'] || '';
  
      this.ticketmasterService.getEventsByLocation(this.location, this.genre).subscribe(res => {
        const allEvents = res._embedded?.events || [];
        this.ticketmasterEvents = this.filterEventsByGenre(allEvents);
      });
    });
  }


  // getTicketmasterEvents method sort by location
  getTicketmasterEvents() {
    this.ticketmasterService.getEventsByLocation(this.location).subscribe({
      next: (res: any) => {
        this.ticketmasterEvents = res._embedded?.events || [];
        console.log('Ticketmaster:', this.ticketmasterEvents);
      },
      error: err => console.error('Ticketmaster API error:', err)
    });
  }

  /*
  // getEventbriteEvents method sort by location
  getEventbriteEvents() {
    this.eventbriteService.getEventsByLocation('Dublin').subscribe(res => {
      console.log('Eventbrite:', res);
      this.eventbriteEvents = res.events || [];
    });
    
  }
    */
  addToFavourites(event: any) {
    this.favouritesService.addFavourite(event);
    this.toastController.create({
      message: 'Added to favourites!',
      duration: 1500,
      color: 'success'
    }).then(toast => toast.present());
  }

  filterEventsByGenre(events: any[]): any[] {
    if (!this.genre || this.genre.trim() === '') {
      return events;
    }
  
    return events.filter((event) => {
      const classifications = event.classifications || [];
      return classifications.some((c: any) =>
        c.genre?.name?.toLowerCase().includes(this.genre.toLowerCase())
      );
    });
  }
    
}
