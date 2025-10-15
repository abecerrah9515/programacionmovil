import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { firebase } from '';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // provideFirebaseApp(() => initializeApp(firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"applicacion1254785899","appId":"1:288976883026:web:cdb6703f4953f82762fe8b","storageBucket":"applicacion1254785899.firebasestorage.app","apiKey":"AIzaSyBBmlPX_z4lPvCOpiNzuKMJY5f9N4Nf3_Q","authDomain":"applicacion1254785899.firebaseapp.com","messagingSenderId":"288976883026"})), provideAuth(() => getAuth()),
  ],
});
