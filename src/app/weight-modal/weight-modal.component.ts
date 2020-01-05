import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WeightModel } from '../models/weight-model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { SessionHolderModel } from '../models/sessionholder-model';

@Component({
  selector: 'app-weight-modal',
  templateUrl: './weight-modal.component.html',
  styleUrls: ['./weight-modal.component.scss']
})
export class WeightModalComponent implements OnInit {

  public weightForm: FormGroup;
  private weightModel: WeightModel = {};
  private modalRef: NgbModalRef;

  @Input() weight: WeightModel;

  @Input() session: SessionHolderModel;

  @Input() id: string;

  @Output() add = new EventEmitter<WeightModel>();

  @Output() update = new EventEmitter<WeightModel>();

  @Output() delete = new EventEmitter<string>();

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.weight) {
      this.weightModel = this.weight;
    }
  }

  public open(content) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  public addWeight() {
    this.weightModel.date.month--; //"Feels weird starting at 0" ng-bootstrap Issue#728
    this.weightModel.date = moment(this.weightModel.date).toDate();
    this.weightModel.user = this.session.email;
    this.add.emit(this.weightModel);
    this.endInteraction();
  }

  public updateWeight() {
    if (this.weightForm.valid) {
      this.update.emit(this.weightModel);
      this.endInteraction();
    }
  }

  public deleteWeight() {
    if (this.id) {
      this.delete.emit(this.id);
      this.endInteraction();
    }
  }

  public formatWeightValue(value) {
    const stringValue = value.toString();
    return stringValue.replace(/[^0-9\\.]+/g, '');
  }

  private endInteraction() {
    this.weightModel = {};
    this.modalRef.close();
  }
}
