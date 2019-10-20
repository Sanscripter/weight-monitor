import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public sortByDate(a, b) {
    return a.date > b.date ? 1 : -1;
  }

}
