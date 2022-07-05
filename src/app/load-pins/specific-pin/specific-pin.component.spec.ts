import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPinComponent } from './specific-pin.component';

describe('SpecificPinComponent', () => {
  let component: SpecificPinComponent;
  let fixture: ComponentFixture<SpecificPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificPinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
