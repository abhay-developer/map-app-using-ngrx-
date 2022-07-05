import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAllPinsComponent } from './load-all-pins.component';

describe('LoadAllPinsComponent', () => {
  let component: LoadAllPinsComponent;
  let fixture: ComponentFixture<LoadAllPinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadAllPinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadAllPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
