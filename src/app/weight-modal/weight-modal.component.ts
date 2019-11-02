import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WeightModel } from '../models/weight-model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weight-modal',
  templateUrl: './weight-modal.component.html',
  styleUrls: ['./weight-modal.component.scss']
})
export class WeightModalComponent implements OnInit {

  public weightForm: FormGroup;
  private weightModel: WeightModel;

  @Input() weight: WeightModel;

  @Output() add = new EventEmitter<WeightModel>();

  @Output() update = new EventEmitter<WeightModel>();

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.weightForm = this.formBuilder.group({
      value: ['', Validators.required],
      date: ['', Validators.required],
    });

  }

  public open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  public addWeight() {
    if (this.weightForm.valid) {
      this.add.emit(this.weightModel);
    }
  }

  public updateWeight() {
    if (this.weightForm.valid) {
      this.update.emit(this.weightModel);
    }
  }

}
