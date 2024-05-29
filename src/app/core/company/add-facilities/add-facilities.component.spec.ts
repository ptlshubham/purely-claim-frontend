import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacilitiesComponent } from './add-facilities.component';

describe('AddFacilitiesComponent', () => {
  let component: AddFacilitiesComponent;
  let fixture: ComponentFixture<AddFacilitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFacilitiesComponent]
    });
    fixture = TestBed.createComponent(AddFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
