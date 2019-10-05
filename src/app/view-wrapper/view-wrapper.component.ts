import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-wrapper',
  templateUrl: './view-wrapper.component.html',
  styleUrls: ['./view-wrapper.component.css']
})
export class ViewWrapperComponent implements OnInit {

  constructor() { }


  private menino: string;


  ngOnInit() {
    this.willy();
  }

  public willy() {
    console.log('menino willy');
  }

}
