import { Component, OnInit, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { WeightModel } from '../models/weight-model';
import { WeightsService } from '../services/firebase/weights.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionHolderModel } from '../models/sessionholder-model';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public weights: WeightModel[];
  public sessionHolder: SessionHolderModel;
  private sessionSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private weightsService: WeightsService) {
  }

  ngOnInit() {
    this.sessionSubscription = this.authenticationService.currentUser.subscribe(value => {
      if (!value || !value.email) {
        this.router.navigate(['/login']);
        return;
      }
      this.sessionHolder = value;
      this.weightsService.getUserWeights(this.sessionHolder).subscribe(data => {
        this.weights = data;
      });
    });
  }

  ngOnDestroy() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  public deleteWeight(id: string) {
    this.weightsService.delete(id);
  }

  public updateWeight(weight: WeightModel) {
    this.weightsService.update(weight);
  }

  public addWeight(weight: WeightModel | any) {
    weight.active = true;
    this.weightsService.add(weight);
  }

  public logout() {
    this.authenticationService.logout();
  }

}
