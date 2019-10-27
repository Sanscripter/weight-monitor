import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SessionHolderModel as LoginModel } from '../models/sessionholder-model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginModel: LoginModel;
  private loginForm: FormGroup;
  private formSubscription: Subscription;
  private sessionSubscription: Subscription;
  private currentUserSubscription: Subscription;
  private error: string;
  private submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(val => {
      if (val && val.email) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.formSubscription = this.loginForm.valueChanges
      .subscribe(data => this.loginModel = data);
  }

  public submitLogin() {
    this.authenticationService.login(this.loginModel);
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

}
