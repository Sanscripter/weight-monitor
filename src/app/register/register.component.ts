import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { SessionHolderModel as RegistrationModel } from '../models/sessionholder-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private registrationModel: RegistrationModel;
  private registrationForm: FormGroup;
  private formSubscription: Subscription;
  private error: string;
  private submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }


  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.formSubscription = this.registrationForm.valueChanges
      .subscribe(data => this.registrationModel = data);
  }

  public submitRegistration() {
    this.authenticationService.register(this.registrationModel);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

}
