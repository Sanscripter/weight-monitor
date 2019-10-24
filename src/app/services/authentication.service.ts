import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user-model';
import { UsersService } from './firebase/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegistrationModel as SessionHolderModel } from '../models/sessionholder-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserModel>;
  private currentUser: Observable<UserModel>;

  constructor(private afAuth: AngularFireAuth) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public login(loginData: SessionHolderModel) {
    this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password).then(() => {
      return "Success";
    }).catch(response => {
      return response.message;
    });
  }

  public register(registrationData: SessionHolderModel) {
    this.afAuth.auth.createUserWithEmailAndPassword(registrationData.email, registrationData.password).then(() => {
      return "Success";
    }).catch(response => {
      return response.message;
    });
  }

}
