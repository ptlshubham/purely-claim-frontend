import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationloginComponent } from './organizationlogin.component';

describe('OrganizationloginComponent', () => {
  let component: OrganizationloginComponent;
  let fixture: ComponentFixture<OrganizationloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationloginComponent]
    });
    fixture = TestBed.createComponent(OrganizationloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
