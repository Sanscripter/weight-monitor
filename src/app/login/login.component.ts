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
  private error: string;
  private submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService
  ) {
    // if (this.authenticationService.currentUserValue.email) {
    //   this.router.navigate(['/dashboard']);
    // }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.formSubscription = this.loginForm.valueChanges
      .subscribe(data => this.loginModel = data);

    this.sessionSubscription = this.authenticationService.currentUser.subscribe(value => {
      if (value.email) {
        this.router.navigate(['/dashboard']);
      }
    });
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
  }

}
