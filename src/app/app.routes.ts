import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'events',
    loadComponent: () => import('./events/events.page').then( m => m.EventsPage)
  },  
  {
    path: 'favourites',
    loadComponent: () => import('./favourites/favourites.page').then( m => m.FavouritesPage)
  },

  {
    path: 'suggested',
    loadComponent: () => import('./suggested/suggested.page').then( m => m.SuggestedPage)
  },

];
