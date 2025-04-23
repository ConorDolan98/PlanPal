import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader ,IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonContent, RouterLink, IonApp, IonRouterOutlet, IonHeader ,IonToolbar, IonTitle, IonButtons, IonButton ],
})
export class AppComponent {
  constructor() {}
}
