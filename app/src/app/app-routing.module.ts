import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GoalsViewComponent } from './goals-view/goals-view.component';
import { ChartsViewComponent } from './charts-view/charts-view.component';


const routes: Routes = [
  { path: 'charts', component: ChartsViewComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'goals',
    component: GoalsViewComponent,
    data: {
      title: 'Goals'
    }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
