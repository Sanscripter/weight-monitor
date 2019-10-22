import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/firebase/users.service';
import { UserModel } from '../models/user-model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: UserModel;
  private registrationForm: FormGroup;
  private error: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UsersService,
              private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUser) {
      this.router.navigate(['/home']);
    }
  }


  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private register() {
    if (!this.registrationForm.valid) {
      this.user.creationDate = new Date();
      this.userService.add(this.user);
    }
  }

}
