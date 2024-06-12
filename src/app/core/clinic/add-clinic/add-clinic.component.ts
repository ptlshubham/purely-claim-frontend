import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getTimezonesForCountry } from 'countries-and-timezones';
import { routes } from 'src/app/shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { FacilitiesService } from 'src/app/shared/services/facilities.services';
interface data {
  value: string;
}


let coun: any;
coun = getTimezonesForCountry('US');
console.log(coun);
@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.scss']
})
export class AddClinicComponent {
  public routes = routes;
  ClinicList: any = [];
  searchDataValue: string = ''
  SpecialityList: any = []
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  allData: any = [];
  selectedList5: data[] = [
    { value: 'Chicago (GMT-5)' },
    { value: 'Denver (GMT-6)' },
    { value: 'Phoenix (GMT-7)' },
    { value: 'Los Angeles (GMT-7)' },
    { value: 'Anchorage (GMT-8)' },
    { value: 'Honolulu (GMT-10)' }
  ]

  public ClinicForm: FormGroup;

  public sortData(sort: Sort): void {
    const data = this.ClinicList.slice();
    if (!sort.active || sort.direction === '') {
      this.ClinicList = data;
    } else {
      this.ClinicList = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  constructor(
    private ClinicService: ClinicService,
    private FacilitiesService: FacilitiesService

  ) {
    this.ClinicService.getAllAddressData().then((data: any) => {
      this.allData = data;
      this.countries = [...new Set(data.map((item: any) => item.country))];
    });
  }
  ngOnInit(): void {
    this.validateForm();
    this.getAllSpeciality();

    // this.validationForm = this.formBuilder.group({
    //   name: ['', [Validators.required]]
    // });
  }
  // get f() { return this.validationForm.controls; }

  private validateForm(): void {
    this.ClinicForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Timezone: new FormControl('', Validators.required),
      NPI: new FormControl(),
      POS: new FormControl(),
      Speciality: new FormControl(),
      Taxid: new FormControl(),
      CLIA: new FormControl(),
      Email: new FormControl('', Validators.required),
      Contact: new FormControl('', Validators.required),
      Avatar: new FormControl(),
      Address: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      Postal: new FormControl('', Validators.required),
    });


  }
  onCountryChange(country: string) {
    this.states = this.allData.filter((item: any) => item.country === country).map((item: any) => item.subcountry);
    this.cities = [];
    this.ClinicForm.controls['State'].reset();
    this.ClinicForm.controls['City'].reset();
  }

  onStateChange(state: string) {
    this.cities = this.allData.filter((item: any) => item.subcountry === state);
    this.ClinicForm.controls['City'].reset();
  }

  send(): void {
    console.log(coun);
  }

  getAllSpeciality() {
    debugger;
    this.FacilitiesService.getAllSpecialityDetails().subscribe((res: any) => {
      this.SpecialityList = res;
    });
  }
  public searchData(value: any): void {
  }

}
