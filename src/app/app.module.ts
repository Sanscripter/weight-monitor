import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule  } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewWrapperComponent } from './view-wrapper/view-wrapper.component';
import { ChartComponent } from './chart/chart.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GoalsViewComponent } from './goals-view/goals-view.component';
import { GoalsComponent } from './goals-view/goals/goals.component';
import { WeightModalComponent } from './weight-modal/weight-modal.component';

@NgModule({
   declarations: [
      AppComponent,
      DashboardComponent,
      PageNotFoundComponent,
      ViewWrapperComponent,
      ChartComponent,
      RegisterComponent,
      LoginComponent,
      GoalsComponent,
      GoalsViewComponent,
      WeightModalComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      ChartsModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
