import { Component, OnInit, Output, EventEmitter, ViewChild  } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WeightModel } from '../models/weight-model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weight-modal',
  templateUrl: './weight-modal.component.html',
  styleUrls: ['./weight-modal.component.scss']
})
export class WeightModalComponent implements OnInit {

  public weightForm: FormGroup;
  private weightModel: WeightModel;
  private formSubscription: Subscription;

  @Output() add = new EventEmitter<WeightModel>();

  @Output() update = new EventEmitter<WeightModel>();

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.weightForm =  this.formBuilder.group({
      value: ['', Validators.required],
      date: ['', Validators.required],
    });

    this.formSubscription = this.weightForm.valueChanges
      .subscribe(data => this.weightModel = data);
  }

  public open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  public addWeight() {
    console.log(this.weightModel);
    this.add.emit(this.weightModel);
  }

}
