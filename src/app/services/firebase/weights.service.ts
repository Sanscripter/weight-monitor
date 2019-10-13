import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { WeightModel } from 'src/app/models/weight-model';

@Injectable({
  providedIn: 'root'
})
export class WeightsService {

  weightsCollection: AngularFirestoreCollection<WeightModel>;
  weights: Observable<WeightModel[]>;

  constructor(public db: AngularFirestore) {
    this.weights = db.collection('weights').snapshotChanges().pipe(
      map(changes => {
      return changes.map(c => {
        const weight = c.payload.doc.data() as WeightModel;
        weight.id = c.payload.doc.id;
        return weight;
      });
    }));
  }

  public getWeightList() {
    return this.weights;
  }

  // public insertWeight(weight: WeightModel): AngularFirestoreDocument {
  //   return <AngularFirestoreDocument>this.db.collection('weights').add({
  //     user: weight.user,
  //     date: weight.date,
  //     value: weight.value
  //   })
  // }

  // public getWeights(user: UserModel): Observable<WeightModel[]>{
  //   return <Observable<WeightModel[]>>of(this.db.collection('weights').get()) 
  // }

}
