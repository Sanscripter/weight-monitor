import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GoalsComponent } from './goals/goals.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GoalsViewComponent } from './goals-view/goals-view.component';
import { ChartsViewComponent } from './charts-view/charts-view.component';
import { ViewWrapperComponent } from './view-wrapper/view-wrapper.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      GoalsComponent,
      PageNotFoundComponent,
      GoalsViewComponent,
      ChartsViewComponent,
      ChartsViewComponent,
      ViewWrapperComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
