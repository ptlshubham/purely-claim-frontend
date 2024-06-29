import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators, FormGroup, FormControl, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { environment, facilityList } from 'src/app/shared/models/models';
import { FacilitiesService } from 'src/app/shared/services/facilities.services';
import { UserProfileService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-organizationregister',
  templateUrl: './organizationregister.component.html',
  styleUrls: ['./organizationregister.component.scss']
})
export class OrganizationregisterComponent implements OnInit {
  specialityList: any = [];
  public selectedValue !: string;
  dataSource!: MatTableDataSource<facilityList>;
  signupForm!: FormGroup;
  submitted = false;
  routes: any;
  isRegister: boolean = false
  registrationModel: any = {}

  constructor(
    private formBuilder: UntypedFormBuilder,
    private facilitiesService: FacilitiesService,
    private userProfileService: UserProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm();
    this.getAllSpeciality();
  }
  get f() { return this.signupForm.controls; }
  private validateForm(): void {
    this.signupForm = new FormGroup({
      lastname: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      phoneno: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      Speciality: new FormControl('', Validators.required),

    })
  }
  getAllSpeciality() {
    this.facilitiesService.getAllSpecialityDetails().subscribe((res: any) => {
      this.specialityList = res;
    });
  }
  saveRegistration(): void {
    this.userProfileService.saveregistartion(this.registrationModel).subscribe((data: any) => {
      this.showAddedMsg();
      // this.router.navigate(['/login']);
    })
  }

  showAddedMsg() {
    debugger
    this.isRegister = true;
    setTimeout(() => {
      this.isRegister = false;
    }, 3000); // or 5000 for 5 seconds
  }
}
