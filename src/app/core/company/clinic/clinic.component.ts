import { Component } from '@angular/core';
import { getTimezonesForCountry, getAllTimezones } from 'countries-and-timezones';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { FacilitiesService } from 'src/app/shared/services/facilities.services';

interface data {
  value: string;
}

let coun: any;
@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent {
  public routes = routes;
  ClinicList: any = [];
  searchDataValue: string = ''
  SpecialityList: any = []
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  allData: any = [];
  isOpen: boolean = false;
  timezones: any[] = []
  primaryFacilityModel: any = {}
  selectedList5: data[] = [];
  primaryfacilityList: any = []
  PlaceOfService: data[] = [
    { value: 'Home' },
    { value: 'Office' }
  ]
  primaryFacilityimg: any
  imageUrl: any = "assets/images/file-upload-image.jpg";
  cardImageBase64: any;
  clogo: any = null;
  editFile: boolean = true;
  ClinicForm: FormGroup;
  facilityList: any = []
  clinicid: any = localStorage.getItem('clinicid');
  userid: any = localStorage.getItem('userid');
  role: any = localStorage.getItem('role');
  stateData: any = []
  primaryfacility: any = []
  selectedCountry: string = '';
  statesByCountry: { [country: string]: Set<string> } = {};
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
    private clinicService: ClinicService,
    private facilitiesService: FacilitiesService,

  ) {
    this.clinicService.getAllAddressData().then((data: any) => {
      this.allData = data;
      // Remove duplicate countries
      this.countries = [...new Set(data.map((item: any) => item.country))];
      // Prepare data with unique states and cities
      this.statesByCountry = {};
      this.allData.forEach((item: any) => {
        if (!this.statesByCountry[item.country]) {
          this.statesByCountry[item.country] = new Set();
        }
        this.statesByCountry[item.country].add(item.subcountry);
      });
    });
  }
  ngOnInit(): void {
    this.validateForm();
    this.getAllSpeciality();
    this.getAllfacilityType();
    this.getStateList();
    this.getAllPrimaryFacilityList();
  }
  getStateList() {
    this.clinicService.getTimeZone().subscribe((res: any) => {
      this.selectedList5 = Object.keys(res).map(key => ({ value: `usa/${key.toLowerCase()}`, label: key }));
    });
  }
  private validateForm(): void {
    this.ClinicForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Timezone: new FormControl('', Validators.required),
      Speciality: new FormControl('', Validators.required),
      facilitytype: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      Contact: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      Postal: new FormControl('', Validators.required),
      NPI: new FormControl('', Validators.required),
      pos: new FormControl('', Validators.required),
      Taxid: new FormControl('', Validators.required),
      Avatar: new FormControl('', Validators.required)
    });


  }
  onCountryChange(country: string) {
    this.selectedCountry = country;
    if (this.statesByCountry[country]) {
      this.states = [...this.statesByCountry[country]];
    } else {
      this.states = [];
    }
    this.cities = []; // Clear cities when country changes
    this.ClinicForm.controls['State'].reset();
    this.ClinicForm.controls['City'].reset();
  }

  onStateChange(state: string) {
    if (state && this.selectedCountry) {
      this.cities = this.allData.filter((item: any) => item.subcountry === state && item.country === this.selectedCountry);
    } else {
      this.cities = [];
    }
    this.ClinicForm.controls['City'].reset();
  }

  send(): void {
    console.log(coun);
  }
  backToTable() {
    this.isOpen = false;
  }
  addclinic() {
    this.isOpen = true;
  }
  getAllSpeciality() {
    this.facilitiesService.getAllSpecialityDetails().subscribe((res: any) => {
      this.SpecialityList = res;
    });
  }
  searchData(value: any): void {
  }
  BackToTabel() {
    this.isOpen = false;
  }
  uploadFile(event: any) {
    debugger
    let reader = new FileReader();
    let file = event.target.files[0];
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      if (event.target.files && event.target.files[0]) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageUrl = reader.result;
          const imgBase64Path = reader.result;
          this.cardImageBase64 = imgBase64Path;
          const formdata = new FormData();
          formdata.append('file', file);
          this.clinicService.uploadFacilityImage(formdata).subscribe((response) => {
            this.primaryFacilityimg = response;
            debugger
          });
        }
      }
    };
  }
  SavePrimaryFacilityDeatails() {
    this.primaryFacilityModel.userid = this.userid;
    this.primaryFacilityModel.clinicid = this.clinicid;
    this.primaryFacilityModel.facilityimage = this.primaryFacilityimg;
    this.clinicService.savePrimaryFacility(this.primaryFacilityModel).subscribe((data: any) => {
      this.primaryfacilityList = data;
      this.primaryFacilityModel = {};
    })
  }
  getAllfacilityType() {
    this.facilitiesService.getAllFacilityTypeList().subscribe((res: any) => {
      this.facilityList = res;

    });
  }
  getAllPrimaryFacilityList() {
    this.facilitiesService.getAllPrimaryFacility().subscribe((res: any) => {
      this.primaryfacility = res;
    });
  }
}
