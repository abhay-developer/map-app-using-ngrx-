import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAndDeletePinsComponent } from './update-and-delete-pins.component';

describe('UpdateAndDeletePinsComponent', () => {
  let component: UpdateAndDeletePinsComponent;
  let fixture: ComponentFixture<UpdateAndDeletePinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAndDeletePinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAndDeletePinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
