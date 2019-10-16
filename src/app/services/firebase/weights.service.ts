import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { WeightModel } from 'src/app/models/weight-model';

@Injectable({
  providedIn: 'root'
})
export class WeightsService {

  constructor(public db: AngularFirestore) {
    this.weights = this.collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(change => {
          const weight = change.payload.doc.data() as WeightModel;
          weight.id = change.payload.doc.id;
          return weight;
        });
      }));
  }

  private weightsCollection: AngularFirestoreCollection<WeightModel>;
  private weights: Observable<WeightModel[]>;
  private collection = this.db.collection('weights');

  public getListUserList(user: any): Observable<Array<WeightModel>> {
    const list = [];
    const resultSnapshot =  this.db.collection('weights', ref => ref.where('user', '==', user.email))
      .snapshotChanges()
      .pipe(flatMap(weights => weights));
    resultSnapshot.subscribe(dbDoc => {
      list.push(dbDoc.payload.doc.data());
    });
    return of(list);
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

  public delete(id: string) {
    this.db.doc(`weights/${id}`).delete();
  }

}
