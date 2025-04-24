import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private favourites: any[] = [];

  addFavourite(event: any) {
    if (!this.isFavourite(event)) {
      this.favourites.push(event);
    }
  }

  removeFavourite(eventId: string) {
    this.favourites = this.favourites.filter(fav => fav.id !== eventId);
  }

  getFavourites() {
    return this.favourites;
  }

  isFavourite(event: any): boolean {
    return this.favourites.some(fav => fav.id === event.id);
  }
}
