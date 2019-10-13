import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { WeightModel } from 'src/app/models/weight-model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) { }

  // TODO: create colection enums



  public insertWeight(weight: WeightModel): Observable<any> {
    return <Observable<any>> of(this.db.collection('weights').add({
      user: weight.user,
      date: weight.date,
      value: weight.value
    }));
  }

  // public getWeights(user: UserModel): Observable<WeightModel[]>{
  //   return <Observable<WeightModel[]>>of(this.db.collection('weights').get()) 
  // }

}
