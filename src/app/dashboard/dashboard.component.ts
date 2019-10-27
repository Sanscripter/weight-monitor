import { Component, OnInit, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { WeightModel } from '../models/weight-model';
import { WeightsService } from '../services/firebase/weights.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionHolderModel } from '../models/sessionholder-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  public weights: WeightModel[];
  private sessionHolder: SessionHolderModel;
  private sessionSubscription: Subscription;

  //Temporary data mock
  private user = {
    email: 'otheruser@example.com'
  };

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private weightsService: WeightsService) {

    // if (!this.authenticationService.currentUserValue.email) {
    //     this.router.navigate(['/login']);
    // }
  }

  ngOnInit() {
    this.weightsService.getUserWeights(this.user).subscribe(data => {
      this.weights = data;
    });
    this.sessionSubscription = this.authenticationService.currentUser.subscribe(value => {
      if (!value.email) {
        this.router.navigate(['/login']);
      }
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

  public logout() {
    this.authenticationService.logout();
  }

}
