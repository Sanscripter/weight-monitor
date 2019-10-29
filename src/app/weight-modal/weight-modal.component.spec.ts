/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WeightModalComponent } from './weight-modal.component';

describe('WeightModalComponent', () => {
  let component: WeightModalComponent;
  let fixture: ComponentFixture<WeightModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
