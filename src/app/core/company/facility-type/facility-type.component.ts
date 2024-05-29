import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
// import { MatDialog } from '@angular/material/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddFacilitiesComponent } from '../add-facilities/add-facilities.component';
import { Sort } from '@angular/material/sort';
import { pageSelection } from 'src/app/shared/models/models';
import { FormControl, FormControlName, FormGroup, Validators, UntypedFormGroup, FormBuilder, UntypedFormBuilder } from '@angular/forms';
import { FacilityType } from 'src/app/shared/models/models';

interface data {
  value: string ;
}
@Component({
  selector: 'app-facility-type',
  templateUrl: './facility-type.component.html',
  styleUrls: ['./facility-type.component.scss']
})
export class FacilityTypeComponent implements OnInit {
  public routes = routes;
  selectedList: data[] =[
    {value: 'Facility1'},
    {value: 'Facility2'},
    {value: 'Facility2'},
  ]
  public facilityList: Array<FacilityType> = [
    {
      id: 1,
      name: "Facility1"
    },
    {
      id: 2,
      name: "Facility2"
    },
    {
      id: 3,
      name: "Facility3"
    }
  ];


  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  isOpen: boolean = false;


  public sortData(sort: Sort): void {
    const data = this.facilityList.slice();
    if (!sort.active || sort.direction === '') {
      this.facilityList = data;
    } else {
      this.facilityList = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  private getTableData(): void {
    this.facilityList = [];
    this.serialNumberArray = [];

  }

  public searchData(value: any): void {
    // this.dataSource.filter = value.trim().toLowerCase();
    // this.facilityList = this.dataSource.filteredData;
  }
  backToTable() {
    this.isOpen = false
  }
  addToList() {
    this.isOpen = true
  }


  constructor(private formBuilder: UntypedFormBuilder) { 
    
  }

  // public facType: FormGroup;
  facType!: UntypedFormGroup;
  submitted = false;

  ngOnInit(): void{
    this.facType = this.formBuilder.group({
      name:['', [Validators.required, Validators.pattern(/^[A-Za-z]{1,20}$/)]],
    })
  }

  get fa() {return this.facType.controls;}

  public onSubmit(): void {
    this.submitted=true;
    if(this.facType.invalid){
      return;
    }
    else{
      console.log("valid");
    }
  }

  onEdit(): void{
    alert("Clicked!");
  }
  onDelete(): void{ 
    alert("Clicked!");
  }
  addInList(e:any): void{
    let id= this.facilityList.length+1;
    let name = (e.target.getAttribute('name'));
    this.facilityList.push({id:id, name:name});
  }

}
