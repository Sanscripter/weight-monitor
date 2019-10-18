import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeightModel } from '../models/weight-model';
import { WeightsService } from '../services/firebase/weights.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public weights: WeightModel[];
  private user = {
    email: 'otheruser@example.com'
  };

  constructor(private weightsService: WeightsService) { }

  ngOnInit() {
    this.weightsService.getListUserList(this.user).subscribe(data => {
      this.weights = data.sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });


    });
  }

  ngAfterViewInit(): void {
    console.log(this.weights);

    const newWeight = {
      value: Math.random() * 100 + 70,
      user: this.user.email,
      date: new Date(),
      active: true
    };

    this.weightsService.add(newWeight);
  }

  public deleteWeight(id: string) {
    this.weightsService.delete(id);
  }

  public updateWeight(weight: WeightModel) {
    this.weightsService.update(weight);
  }

}
