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
  private submitted: boolean;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUser) {
      this.router.navigate(['/home']);
    }
  }


  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public submitRegistration(){
    this.register();
  }

  private register() {
    const userMock = {
      email: "allenmasrara3@hotmail.com",
      password: "11111111"
    }
    this.authenticationService.register(userMock);
  }

}
