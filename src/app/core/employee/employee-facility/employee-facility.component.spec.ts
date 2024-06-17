import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFacilityComponent } from 'src/app/shared/routes/routes';

describe('EmployeeFacilityComponent', () => {
  let component: EmployeeFacilityComponent;
  let fixture: ComponentFixture<EmployeeFacilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeFacilityComponent]
    });
    fixture = TestBed.createComponent(EmployeeFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
