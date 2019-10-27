import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { SessionHolderModel } from '../models/sessionholder-model';

@Injectable({ providedIn: 'root' })
export class AuthPass implements CanActivate {

    private currentUser: SessionHolderModel;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(val => {
            this.currentUser = val;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.currentUser && this.currentUser.email) {
            this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        return true;
    }
}
