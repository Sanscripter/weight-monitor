import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { WeightModel } from 'src/app/models/weight-model';
import { UserModel } from 'src/app/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class WeightsService {

  constructor(public db: AngularFirestore) {
  }

  private inactive = { active: false };
  private collection = this.db.collection('weights');

  public getListUserList(user: UserModel): Observable<Array<WeightModel>> {
    return this.db.collection('weights', ref => ref.where('user', '==', user.email).where('active', '==', true))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(change => {
            const weight = change.payload.doc.data() as WeightModel;
            weight.id = change.payload.doc.id;
            weight.$key = change.payload.doc.id;
            return weight;
          });
        }));
  }

  public add(weight: WeightModel) {
    this.collection.add(weight);
    return true;
  }

  public get(id: string) {
    const weightDoc = this.db.doc(`weights/${id}`);
    const weight = weightDoc.valueChanges();
    return weight;
  }

  public update(weight: WeightModel) {
    this.db.doc(`weights/${weight.id}`).update(weight);
  }

  public delete(id: string) {
    this.db.doc(`weights/${id}`).update(this.inactive);
  }


}
