import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserModel } from 'src/app/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public db: AngularFirestore) {
  }

  private inactive = { active: false };
  private collection = this.db.collection('users');

  public getUsers(user: UserModel): Observable<Array<UserModel>> {
    return this.db.collection('users', ref => ref.where('user', '==', user.email).where('active', '==', true))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(change => {
            const userItem = change.payload.doc.data() as UserModel;
            userItem.creationDate = change.payload.doc.data().creationDate.toDate();
            userItem.id = change.payload.doc.id;
            userItem.$key = change.payload.doc.id;
            return user;
          });
        }));
  }

  public add(user: UserModel) {
    this.collection.add(user);
    return true;
  }

  public get(id: string) {
    const userDoc = this.db.doc(`users/${id}`);
    const user = userDoc.valueChanges();
    return user;
  }

  public update(user: UserModel) {
    this.db.doc(`users/${user.id}`).update(user);
  }

  public delete(id: string) {
    this.db.doc(`users/${id}`).update(this.inactive);
  }
}
