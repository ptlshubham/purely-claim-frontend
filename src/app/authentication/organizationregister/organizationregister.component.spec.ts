import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationregisterComponent } from './organizationregister.component';

describe('OrganizationregisterComponent', () => {
  let component: OrganizationregisterComponent;
  let fixture: ComponentFixture<OrganizationregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationregisterComponent]
    });
    fixture = TestBed.createComponent(OrganizationregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
