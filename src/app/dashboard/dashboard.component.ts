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
    });
    this.weightsService.getUserWeights(this.sessionHolder).subscribe(data => {
      this.weights = data;
    });
  }

  ngAfterViewInit(): void {
    //Populating with mocks....

    // const newWeight = {
    //   value: Math.random() * 100 + 70,
    //   user: this.sessionHolder.email,
    //   date: new Date(),
    //   active: true
    // };
    // this.weightsService.add(newWeight);

    //NOTE: I KNOW THIS IS UGLY I JUST WANT TO PUT IT ONLINE FOR TESTERS BUT DON'T WANT TO LOSE IT
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

  public addWeight(weight: WeightModel) {
    this.weightsService.add(weight);
  }

  public logout() {
    this.authenticationService.logout();
  }

}
