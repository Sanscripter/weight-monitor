import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user-model';
import { UsersService } from './firebase/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SessionHolderModel } from '../models/sessionholder-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser = new BehaviorSubject<SessionHolderModel>({});

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.auth.setPersistence(`local`);
  }

  public login(loginData: SessionHolderModel) {
    this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password).then((data) => {
      const sessionHolderData: SessionHolderModel = { email: data.user.email };
      this.currentUser.next(sessionHolderData);
    }).catch(response => {
      console.log(response);
    });
  }

  public logout() {
    this.afAuth.auth.signOut().then(() =>{
      this.currentUser.next({});
    });
  }

  public register(registrationData: SessionHolderModel) {
    this.afAuth.auth.createUserWithEmailAndPassword(registrationData.email, registrationData.password).then((data) => {
      console.log(data);
    }).catch(response => {
      console.log(response);
    });
  }

}
