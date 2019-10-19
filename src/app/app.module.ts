import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewWrapperComponent } from './view-wrapper/view-wrapper.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      PageNotFoundComponent,
      ViewWrapperComponent,
      ChartComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
