import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { SessionHolderModel } from '../models/sessionholder-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser = new BehaviorSubject<SessionHolderModel>({});

  constructor(private afAuth: AngularFireAuth) {
    const localstorageData: SessionHolderModel = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = new BehaviorSubject<SessionHolderModel>(localstorageData);
  }

  public login(loginData: SessionHolderModel) {
    this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password).then((data) => {
      this.updateSessionHolder(data);
    }).catch(response => {
      console.log(response);
    });
  }

  public logout() {
    this.afAuth.auth.signOut().then(() => {
      this.updateSessionHolder(null);
    });
  }

  public register(registrationData: SessionHolderModel) {
    this.afAuth.auth.createUserWithEmailAndPassword(registrationData.email, registrationData.password).then((data) => {
      this.updateSessionHolder(data);
    }).catch(response => {
      console.log(response);
    });
  }

  private updateSessionHolder(data: any) {
    if (!data) {
      localStorage.removeItem('currentUser');
      this.currentUser.next(null);
      return;
    }
    const sessionHolderData: SessionHolderModel = { email: data.user.email };
    localStorage.setItem('currentUser', JSON.stringify(sessionHolderData));
    this.currentUser.next(sessionHolderData);
  }

}
