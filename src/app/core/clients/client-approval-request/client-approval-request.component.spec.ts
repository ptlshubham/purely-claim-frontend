import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientApprovalRequestComponent } from './client-approval-request.component';

describe('ClientApprovalRequestComponent', () => {
  let component: ClientApprovalRequestComponent;
  let fixture: ComponentFixture<ClientApprovalRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientApprovalRequestComponent]
    });
    fixture = TestBed.createComponent(ClientApprovalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
