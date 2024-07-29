import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityCheckFormComponent } from './availability-check-form.component';

describe('AvailabilityCheckFormComponent', () => {
  let component: AvailabilityCheckFormComponent;
  let fixture: ComponentFixture<AvailabilityCheckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityCheckFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityCheckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
