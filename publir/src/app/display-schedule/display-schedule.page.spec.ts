import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySchedulePage } from './display-schedule.page';

describe('DisplaySchedulePage', () => {
  let component: DisplaySchedulePage;
  let fixture: ComponentFixture<DisplaySchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
