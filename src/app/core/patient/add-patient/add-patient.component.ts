import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/shared/routes/routes';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { apiResultFormat, pageSelection, patientList } from 'src/app/shared/models/models';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
  public routes = routes;
  public ValidationForm: FormGroup;
  patientList: any = [];
  dataSource!: MatTableDataSource<patientList>;
  public searchDataValue = '';
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  allData: any = [];
  isOpen: boolean = false;
  FacilityList: any[] = [];
  ngOnInit(): void {
    this.validateForm();
    this.FacilityList = [
      { value: 'Iris' },
      { value: 'Apollo' }
      // Add more options as needed
    ];

  }
  get f() { return this.ValidationForm.controls; }

  private validateForm(): void {
    this.ValidationForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Facility: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      Postal: new FormControl('', Validators.required),
      DateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      Age: new FormControl('', Validators.required),
      medicalCondition: new FormControl('', Validators.required)

    })
  }
  constructor(
    private ClinicService: ClinicService,
  ) {
    // this.ClinicService.getAllAddressData().then((data: any) => {
    //   this.allData = data;
    //   this.countries = [...new Set(data.map((item: any) => item.country))];
    // });
  }
  onCountryChange(country: string) {
    this.states = this.allData.filter((item: any) => item.country === country).map((item: any) => item.subcountry);
    this.cities = [];
    this.ValidationForm.controls['State'].reset();
    this.ValidationForm.controls['City'].reset();
  }

  onStateChange(state: string) {
    this.cities = this.allData.filter((item: any) => item.subcountry === state);
    this.ValidationForm.controls['City'].reset();
  }
  BackToTable() {
    this.isOpen = false
  }

  public sortData(sort: Sort): void {
    const data = this.patientList.slice();
    if (!sort.active || sort.direction === '') {
      this.patientList = data;
    } else {
      this.patientList = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  addPatient() {
    this.isOpen = true;
  }
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.patientList = this.dataSource.filteredData;
  }

}
