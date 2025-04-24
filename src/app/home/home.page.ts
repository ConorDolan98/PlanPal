import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  manualLocation: string = '';
  startDate: string = '';
  endDate: string = '';
  selectedGenre: string = '';
  showGenreFilter: boolean = false;
  genre: string = '';

  constructor(private router: Router) {}

  //Async method waits for geolocation
  async getLocation() {
    try {
      const coords = await Geolocation.getCurrentPosition();
      const lat = coords.coords.latitude;
      const lon = coords.coords.longitude;
      console.log('Your Location:', lat, lon);

      this.navigateToEvents({
        latitude: lat,
        longitude: lon
      });

    } catch (error) {
      console.error('Location Error:', error);
      alert('Error getting location. Please enter it manually.');
    }
  }

  //Passes data to events page
  goToEvents() {
    if (!this.manualLocation) {
      alert('Please enter a location or use GPS.');
      return;
    }

    this.navigateToEvents({ location: this.manualLocation });
  }

  //method to pass query params to events page
  private navigateToEvents(baseParams: any) {
    const queryParams = {
      ...baseParams,
      start: this.startDate,
      end: this.endDate,
      genre: this.selectedGenre
    };

    this.router.navigate(['/events'], { queryParams });
  }

  //Method to show genres
  enableGenreFilter() {
    this.showGenreFilter = !this.showGenreFilter;
  }

  getEventsByGenre() {
    console.log('Selected Genre:', this.selectedGenre);
  }
}
