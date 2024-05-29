import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Country, getTimezonesForCountry } from 'countries-and-timezones'

interface data {
  value: string ;
}
interface coun {
  value: any ;
}

let coun: any;
coun = getTimezonesForCountry('US');
console.log(coun);


@Component({
  selector: 'app-add-facilities',
  templateUrl: './add-facilities.component.html',
  styleUrls: ['./add-facilities.component.scss']
})

export class AddFacilitiesComponent{
  public routes = routes;
  public selectedValue !: string  ;
  // validationForm!: FormGroup;
  // submitted = false;
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

  public FacilityForm: FormGroup;

  constructor(  ) {

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

  send(): void{
    console.log(coun);
  }
}
