import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth-guard';
import { AuthPass } from './shared/auth-pass';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, },
  { path: 'login', component: LoginComponent, canActivate: [AuthPass] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  {
    data: {
      title: 'The last weight tracker you will ever need.',
    },
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
