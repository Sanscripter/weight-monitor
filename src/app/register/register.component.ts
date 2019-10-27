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
  private currentUserSubscription: Subscription;
  private error: string;
  private submitted: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private formBuilder: FormBuilder
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(val => {
      console.log('value changed');
      console.log(val);
      if (val && val.email ) {
        this.router.navigate(['/dashboard']);
      }
    });
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
    this.currentUserSubscription.unsubscribe();
  }

}
