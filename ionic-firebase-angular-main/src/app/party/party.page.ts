import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  IonButtons,
  IonContent,
  IonFab,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';
import { Observable } from 'rxjs';

import { Party } from './party.model';
import { PartyService } from './party.service';
@Component({
  selector: 'app-party',
  templateUrl: './party.page.html',
  styleUrls: ['./party.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonIcon,
    IonFab,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RouterLink,
    CommonModule,
  ],
})
export class PartyPage {
  private readonly partyService = inject(PartyService);
  private readonly navCtrl = inject(NavController);
  private readonly auth = inject(Auth);
  readonly partyList$: Observable<Party[]> = this.partyService.getPartyList();

  constructor() {
    addIcons({
      add,
    });
  }

  async exit() {
    try {
      await signOut(this.auth);
      await this.navCtrl.navigateRoot('/auth/login');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
}
