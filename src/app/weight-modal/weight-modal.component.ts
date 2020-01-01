import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WeightModel } from '../models/weight-model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
    this.initializeForm();
  }

  private initializeForm() {
    this.weightForm = this.formBuilder.group({
      value: ['', Validators.required],
      date: ['', Validators.required],
    });

  }

  public open(content) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  public addWeight() {
    console.log(this.weightForm.valid);
    if (this.weightForm.valid) {
      this.add.emit(this.weightModel);
      this.modalRef.close();
    }
  }

  public updateWeight() {
    if (this.weightForm.valid) {
      this.update.emit(this.weightModel);
      this.modalRef.close();
    }
  }

  public deleteWeight() {
    if (this.id) {
      this.delete.emit(this.id);
      this.modalRef.close();
    }
  }

}
