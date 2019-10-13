import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeightModel } from '../models/weight-model';
import { WeightsService } from '../services/firebase/weights.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public weights: WeightModel[];

  constructor(private weightsService: WeightsService) { }

  ngOnInit() {
    this.weightsService.getWeightList().subscribe(data => {
      console.log(data);
      this.weights = data;
    });
  }

}
