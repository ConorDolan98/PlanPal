import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule } from '@ionic/angular'; // for ion-* components
import { FormsModule } from '@angular/forms'; // for ngModel

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, FormsModule], //Called here
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  manualLocation: string = '';

  //Async method waits for coordinates before moving on
  async getLocation() {
    try {
      const coords = await Geolocation.getCurrentPosition();
      const lat = coords.coords.latitude;
      const lon = coords.coords.longitude;
      console.log('Your Location:', lat, lon);
    } catch (error) {
      console.error('Location Error:', error);
      alert('Error getting location, please enter manually.');
    }
  }

  searchManualLocation() {
    console.log('Searching for:', this.manualLocation);
  }
}
