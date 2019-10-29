import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WeightModel } from '../models/weight-model';

@Component({
  selector: 'app-weight-modal',
  templateUrl: './weight-modal.component.html',
  styleUrls: ['./weight-modal.component.scss']
})
export class WeightModalComponent implements OnInit {

  closeResult: string;

  @Output() add: EventEmitter<WeightModel> = new EventEmitter();

  @Output() update = new EventEmitter<WeightModel>();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  public open(content) {
    console.log(content);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
