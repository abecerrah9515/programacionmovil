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
import { Observable } from 'rxjs';
import { Party } from './party.model';
import { PartyService } from './party.service';
import { Auth } from '@angular/fire/auth';
import { getAuth, signOut } from "firebase/auth";
import { Router } from '@angular/router';
@Component({
  selector: 'app-party',
  templateUrl: './party.page.html',
  styleUrls: ['./party.page.scss'],
  standalone: true,
  imports: [IonButton,
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
  private readonly router = inject(Router);
  readonly partyList$: Observable<Party[]> = this.partyService.getPartyList();

  constructor(private navCtrl: NavController) {
    addIcons({
      add,
    });
  }

  exit(){
    const auth = getAuth();
    
  signOut(auth)
    .then(() => {
      // Sesión cerrada correctamente
      console.log("Sesión cerrada");
      this.navCtrl.navigateRoot('login');
      // Aquí puedes redirigir al login, por ejemplo
    })
    .catch((error) => {
      console.error("Error al cerrar sesión", error);
    });
  }
}
