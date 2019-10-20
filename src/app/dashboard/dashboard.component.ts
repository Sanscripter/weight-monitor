import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { WeightModel } from '../models/weight-model';
import { WeightsService } from '../services/firebase/weights.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public weights: WeightModel[];
  //Temporary data mock
  private user = {
    email: 'otheruser@example.com'
  };

  constructor(private weightsService: WeightsService) { }

    ngOnInit() {
      this.weightsService.getUserWeights(this.user).subscribe(data => {
        this.weights = data;
      });
    }

    ngAfterViewInit(): void {
      //Populating with mocks....

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
