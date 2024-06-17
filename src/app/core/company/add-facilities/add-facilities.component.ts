import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Country, getTimezonesForCountry } from 'countries-and-timezones'
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { Sort } from '@angular/material/sort';
import { facilityList } from 'src/app/shared/models/models';
import { MatTableDataSource } from '@angular/material/table';

interface data {
  value: string;
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
  facilityList: [];
  selectedList1: data[] = [
    { value: 'Neurology' },
    { value: 'Orthology' },
    { value: 'Radiology' },
  ];
  isOpen: boolean = false
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
  public FacilityList: Array<facilityList> = [];
  dataSource!: MatTableDataSource<facilityList>;

  public searchDataValue = '';

  public FacilityForm: FormGroup;

  constructor(
    private ClinicService: ClinicService,
  ) {
    this.ClinicService.getAllAddressData().then((data: any) => {
      this.allData = data;
      this.countries = [...new Set(data.map((item: any) => item.country))];
    });
  }

  ngOnInit(): void {
    this.validateForm();
    // this.validationForm = this.formBuilder.group({
    //   name: ['', [Validators.required]]
    // });
  }
  // get f() { return this.validationForm.controls; }

  private validateForm(): void {
    this.FacilityForm = new FormGroup({
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
    })
  }
  onCountryChange(country: string) {
    this.states = this.allData.filter((item: any) => item.country === country).map((item: any) => item.subcountry);
    this.cities = [];
    this.FacilityForm.controls['State'].reset();
    this.FacilityForm.controls['City'].reset();
  }

  onStateChange(state: string) {
    this.cities = this.allData.filter((item: any) => item.subcountry === state);
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
    const data = this.facilityList.slice();
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
}
