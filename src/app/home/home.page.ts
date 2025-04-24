import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation'; //Geolocation imported for gps tracking
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {
  manualLocation: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private router: Router) {}

  //async method waits for geolocation to get position
  async getLocation() {
    try {
      const coords = await Geolocation.getCurrentPosition();
      const lat = coords.coords.latitude;
      const lon = coords.coords.longitude;
      console.log('Your Location:', lat, lon);

      // sends the latitude and longitude to events page
      this.router.navigate(['/events'], {
        queryParams: {
          latitude: lat,
          longitude: lon,
          start: this.startDate,
          end: this.endDate
        }
      });

    } catch (error) {
      console.error('Location Error:', error);
      alert('Error getting location. Please enter it manually.');
    }
  }

  // Check to ensure user enters location
  goToEvents() {
    if (!this.manualLocation) {
      alert('Please enter a location or use GPS.');
      return;
    }

    this.router.navigate(['/events'], {
      queryParams: {
        location: this.manualLocation,
        start: this.startDate,
        end: this.endDate
      }
    });
  }
}
