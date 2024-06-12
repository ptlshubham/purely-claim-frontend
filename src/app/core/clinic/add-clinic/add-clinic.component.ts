import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getTimezonesForCountry } from 'countries-and-timezones';
import { routes } from 'src/app/shared/routes/routes';
import { Sort } from '@angular/material/sort';


interface data {
  value: string ;
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

  selectedList1: data[] = [
    {value: 'Neurology'},
    {value: 'Orthology'},
    {value: 'Radiology'},
  ];
  selectedList2: data[] = [
    {value: 'Alaska'},
    {value: 'Los Angeles'},
  ];
  selectedList3: data[] = [
    {value: 'Usa'},
    {value: 'Uk'},
    {value: 'Italy'},
  ];
  selectedList4: data[] = [
    {value: 'Alaska'},
    {value: 'California'},
  ];
  selectedList5: data[] =[
    {value: 'Chicago (GMT-5)'},
    {value: 'Denver (GMT-6)'},
    {value: 'Phoenix (GMT-7)'},
    {value: 'Los Angeles (GMT-7)'},
    {value: 'Anchorage (GMT-8)'},
    {value: 'Honolulu (GMT-10)'}
  ]

  public ClinicForm: FormGroup;
  public sortData(sort: Sort): void {
    const data = this.ClinicList.slice();
    if (!sort.active || sort.direction === '') {
      this.ClinicList = data;
    } else {
      this.ClinicList = data.sort((a:any, b:any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  constructor(

  ) {}
    ngOnInit(): void {
      this.validateForm();
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
      })
    }
  
  send(): void{
    console.log(coun);
  }
  
}
