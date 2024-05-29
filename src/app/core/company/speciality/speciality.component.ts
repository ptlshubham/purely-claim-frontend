import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Speciality, pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';

interface data {
  value: string ;
}

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent {
  public routes= routes;
  public specialityList: Array<Speciality> = [];

  selectedList: data[] =[
      {value: '207N00000X Radiology'},
      {value: '207N00000X Psychology'},
      {value: '207N00000X Neurology'}
    ]
    selectedList1: Speciality[] =[
      {id:1, active:true, name:'Radiology',taxonomyCode:"207N00000X",detail:'',notes:''},
      {id:1, active:true, name:'Psychology',taxonomyCode:"207N00000X",detail:'',notes:''},
      {id:1, active:true, name:'Neurology',taxonomyCode:"207N00000X",detail:'',notes:''}
    ]
 
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
    const data = this.specialityList.slice();
    if (!sort.active || sort.direction === '') {
      this.specialityList = data;
    } else {
      this.specialityList = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  private getTableData(): void {
    this.specialityList = [];
    this.serialNumberArray = [];

  }

  public searchData(value: any): void {
    // this.dataSource.filter = value.trim().toLowerCase();
    // this.specialityList = this.dataSource.filteredData;
  }
  backToTable() {
    this.isOpen = false
  }
  addToList() {
    this.isOpen = true
  }


  constructor(private formBuilder: UntypedFormBuilder) { 
    
  }

  // public specialityForm: FormGroup;
  specialityForm!: UntypedFormGroup;
  submitted = false;

  ngOnInit(): void{
    this.specialityForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.pattern(/^[A-Za-z]{1,20}$/)]],
      taxonomyCode:['',[Validators.required]],
      detail:['',Validators.required],
      notes:['']
    })
  }

  get fa() {return this.specialityForm.controls;}

  public onSubmit(): void {
    this.submitted=true;
    if(this.specialityForm.invalid){
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
    let id= this.specialityList.length+1;
    let name = (e.target.getAttribute('name'));
  }
}
