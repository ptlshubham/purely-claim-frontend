import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Country, getTimezonesForCountry } from 'countries-and-timezones'
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { Sort } from '@angular/material/sort';
import { facilityList } from 'src/app/shared/models/models';
import { MatTableDataSource } from '@angular/material/table';
import { FacilitiesService } from 'src/app/shared/services/facilities.services';
import * as moment from 'moment-timezone';
interface data {
  value: string;
  label: string;
}
interface coun {
  value: any;
}

let coun: any;
coun = getTimezonesForCountry('US');
console.log(coun);


@Component({
  selector: 'app-add-facilities',
  templateUrl: './add-facilities.component.html',
  styleUrls: ['./add-facilities.component.scss']
})

export class AddFacilitiesComponent {
  public routes = routes;
  public selectedValue !: string;
  // validationForm!: FormGroup;
  // submitted = false;
  // facilityList: [];
  isOpen: boolean = false;
  specialityList: any = []
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  allData: any = [];
  // selectedList5: data[] = [];
  // timezones: any[] = []
  selectedList5: data[] = [];
  PlaceOfService: data[] = [
    {
      value: 'Home',
      label: ''
    },
    {
      value: 'Office',
      label: ''
    },
  ]

  public FacilityList: Array<facilityList> = [];
  dataSource!: MatTableDataSource<facilityList>;
  public searchDataValue = '';
  public FacilityForm: FormGroup;
  constructor(
    private ClinicService: ClinicService,
    private facilitiesService: FacilitiesService
  ) {
    moment.tz.names().forEach((timezone: any) => {
      this.selectedList5.push({ value: timezone, label: timezone });
    });
    this.ClinicService.getAllAddressData().then((data: any) => {
      this.allData = data;
      this.countries = [...new Set(data.map((item: any) => item.country))];
    });
  }

  ngOnInit(): void {
    this.validateForm();
    this.getAllSpeciality();
    // this.gettimezones();
  }

  private validateForm(): void {
    this.FacilityForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Timezone: new FormControl('', Validators.required),
      NPI: new FormControl('', Validators.required),
      pos: new FormControl('', Validators.required),
      Speciality: new FormControl('', Validators.required),
      Taxid: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      Contact: new FormControl('', Validators.required),
      Avatar: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      Postal: new FormControl('', Validators.required),
    })
  }

  // gettimezones() {
  //   debugger
  //   this.ClinicService.getData().subscribe((data: any) => {
  //     this.selectedList5 = data;
  //     console.log(data)
  //   });
  // }
  onCountryChange(country: string) {
    this.states = [...new Set(this.allData.filter((item: any) => item.country === country).map((item: any) => item.subcountry))];
    this.cities = [];
    this.FacilityForm.controls['State'].reset();
    this.FacilityForm.controls['City'].reset();
  }

  onStateChange(state: string) {
    this.cities = [...new Set(this.allData.filter((item: any) => item.subcountry === state).map((item: any) => item.name))];
    this.FacilityForm.controls['City'].reset();
  }
  addFacilities() {
    this.isOpen = true
  }
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.FacilityList = this.dataSource.filteredData;
  }

  send(): void {
    console.log(coun);
  }
  public sortData(sort: Sort): void {
    const data = this.FacilityList.slice();
    if (!sort.active || sort.direction === '') {
      this.FacilityList = data;
    } else {
      this.FacilityList = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  BackToTabel() {
    this.isOpen = false
  }

  getAllSpeciality() {
    debugger;
    this.facilitiesService.getAllSpecialityDetails().subscribe((res: any) => {
      this.specialityList = res;
    });
  }
}
