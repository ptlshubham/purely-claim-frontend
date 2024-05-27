import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

interface data {
  value: string ;
}
// interface coun {
//   value: any ;
// }

// let coun: any;
// coun = getAllCountries;


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
    {value: 'Select Specilaity'},
    {value: 'Neurology'},
    {value: 'Orthology'},
    {value: 'Radiology'},
  ];
  selectedList2: data[] = [
    {value: 'Select City'},
    {value: 'Alaska'},
    {value: 'Los Angeles'},
  ];
  selectedList3: data[] = [
    {value: 'Select Country'},
    {value: 'Usa'},
    {value: 'Uk'},
    {value: 'Italy'},
  ];
  selectedList4: data[] = [
    {value: 'Select State'},
    {value: 'Alaska'},
    {value: 'California'},
  ];
  selectedList5: data[] =[
    {value: 'Select Timezone'},
    {value: 'India UTC+5:30'},
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
}

// export class AddFacilitiesComponent {
//   public routes = routes;
//   public selectedValue !: string  ;
//   public totalData = 0;
//   public skip = 0;
//   public pageSize = 10;
//   public limit: number = this.pageSize;
//   public pageNumberArray: Array<number> = [];
//   public pageSelection: Array<pageSelection> = [];
//   public totalPages = 0;
  
//   public timezoneList: Array<TimezoneList> = [];
//   public serialNumberArray: Array<number> = [];
//   dataSource!: MatTableDataSource<TimezoneList>;

//   selectedList1: data[] = [
//     {value: 'Select Specilaity'},
//     {value: 'Neurology'},
//     {value: 'Orthology'},
//     {value: 'Radiology'},
//   ];
  // selectedList2: data[] = [
  //   {value: 'Select City'},
  //   {value: 'Alaska'},
  //   {value: 'Los Angeles'},
  // ];
  // selectedList3: data[] = [
  //   {value: 'Select Country'},
  //   {value: 'Usa'},
  //   {value: 'Uk'},
  //   {value: 'Italy'},
  // ];
  // selectedList4: data[] = [
  //   {value: 'Select State'},
  //   {value: 'Alaska'},
  //   {value: 'California'},
  // ];
  // selectedList5: data[] =[
  //   {value: 'Select Timezone'},
  //   {value: 'India UTC+5:30'},
  // ]
//   selectedList6: any[] = coun;
  
//   constructor(public data: DataService){  }

//   private getTableData(): void {
//     this.timezoneList = [];
//     this.serialNumberArray = [];

//     this.data.getStaffList().subscribe((data: apiResultFormat) => {
//       this.totalData = data.totalData;
//       data.data.map((res: TimezoneList, index: number) => {
//         const serialNumber = index + 1;
//         if (index >= this.skip && serialNumber <= this.limit) {
         
//           this.timezoneList.push(res);
//           this.serialNumberArray.push(serialNumber);
//         }
//       });
//       this.dataSource = new MatTableDataSource<TimezoneList>(this.timezoneList);
//       this.calculateTotalPages(this.totalData, this.pageSize);
//     });
//   }

//   private calculateTotalPages(totalData: number, pageSize: number): void {
//     this.pageNumberArray = [];
//     this.totalPages = totalData / pageSize;
//     if (this.totalPages % 1 != 0) {
//       this.totalPages = Math.trunc(this.totalPages + 1);
//     }
//     /* eslint no-var: off */
//     for (var i = 1; i <= this.totalPages; i++) {
//       const limit = pageSize * i;
//       const skip = limit - pageSize;
//       this.pageNumberArray.push(i);
//       this.pageSelection.push({ skip: skip, limit: limit });
//     }
//   }

// }
