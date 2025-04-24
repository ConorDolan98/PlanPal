import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavouritesService } from '../services/favourites.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage {
  favouriteEvents: any[] = [];

  constructor(private favouritesService: FavouritesService) {}

  ionViewWillEnter() {
    this.favouriteEvents = this.favouritesService.getFavourites();
  }

  removeFromFavourites(event: any) {
    this.favouritesService.removeFavourite(event);
    this.ionViewWillEnter();
  }
}
