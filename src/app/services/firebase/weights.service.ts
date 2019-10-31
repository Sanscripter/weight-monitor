import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { WeightModel } from 'src/app/models/weight-model';
import { UserModel } from 'src/app/models/user-model';
import { HelperService } from '../_helper.service';
import * as joi from '@hapi/joi';


@Injectable({
  providedIn: 'root'
})
export class WeightsService {

  constructor(public db: AngularFirestore,
    private helperService: HelperService) {
  }

  private inactive = { active: false };
  private collection = this.db.collection('weights');
  public weightSchema = joi.object({
    $key: joi.string(),
    id: joi.string(),
    user: joi.string().required(),
    value: joi.number().min(0).required(),
    date: joi.date().required(),
    active: joi.boolean().default(true),
  })

  public getUserWeights(user: UserModel): Observable<Array<WeightModel>> {
    return this.db.collection('weights', ref => ref.where('user', '==', user.email).where('active', '==', true))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(change => {
            const weight = change.payload.doc.data() as WeightModel;
            weight.date = weight.date.toDate();
            weight.id = change.payload.doc.id;
            weight.$key = change.payload.doc.id;
            return weight;
          })
            .sort((a, b) => this.helperService.sortByDate(a, b));
        }));
  }

  public add(weight: WeightModel) {
    const { error, value } = this.weightSchema.validate(weight);
    if (error) {
      console.log(error);
      return;
    }
    console.log('value',value)
    this.collection.add(weight);
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
