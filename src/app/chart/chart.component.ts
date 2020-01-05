import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { WeightsService } from '../services/firebase/weights.service';
import { WeightModel } from '../models/weight-model';
import * as moment from 'moment';
import { HelperService } from '../services/_helper.service';
import { UserModel } from '../models/user-model';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input()
  user: UserModel;

  constructor(private weightService: WeightsService,
              private helperService: HelperService) { }

  public weightList: WeightModel[];
  public chartWeightData: ChartDataSets[] = [];
  public chartWeightLabels: Label[] = [];

  public chartWeightOptions: (ChartOptions) = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.1,
      }
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day'
          }
        }
      ]
    }
  };

  public chartWeightColors: Color[] = [
    {
      borderColor: 'green',
      backgroundColor: 'rgba(0,255,0,0.3)',
    },
  ];
  public chartWeightLegend = false;
  public chartWeightType = 'line';
  public chartWeightPlugins = [];

  ngOnInit() {

    this.weightService.getUserWeights(this.user).subscribe((data) => {
      this.weightList = data;
      this.updateChart();
    });
  }

  private updateChart() {
    //TODO: Handle color loss
    this.chartWeightData[0] = {};
    this.chartWeightData[0].data = [];
    this.chartWeightLabels = [];
    this.weightList = this.weightList.sort((a, b) => this.helperService.sortByDate(a, b));
    this.weightList.forEach(weightData => {
      const formatDate = moment(weightData.date);
      this.chartWeightData[0].data.push(weightData.value);
      this.chartWeightLabels.push(formatDate.toLocaleString());
    });
  }
}
