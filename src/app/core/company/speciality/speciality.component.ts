import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Speciality, pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { FacilitiesService } from 'src/app/shared/services/facilities.services';
import { NgSelectComponent } from '@ng-select/ng-select';

interface data {
  value: string;
}

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent {
  public routes = routes;
  public specialityList: Array<Speciality> = [];
  specialityModel: any = {};
  public employeeList: Array<Speciality> = [];

  selectedList: any = [];
  taxonomyDetail: any = [];
  selectedList1: Speciality[] = []

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

  

  constructor(private formBuilder: UntypedFormBuilder,
    private facilitiesService: FacilitiesService) {
    this.getAllTaxonomyCode();
  }

  // public specialityForm: FormGroup;
  specialityForm!: UntypedFormGroup;
  submitted = false;

  ngOnInit(): void {
    this.specialityForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{1,20}$/)]],
      taxonomyCode: ['', [Validators.required]],
      detail: ['', Validators.required],
      notes: ['']
    })
  }
  getAllTaxonomyCode() {
    this.facilitiesService.getAllTaxonomyCode().then((res: any) => {
      this.selectedList = res;
      console.log(this.selectedList[0]['MEDICARE PROVIDER/SUPPLIER TYPE DESCRIPTION']);
      this.specialityModel = {};
      this.specialityForm.markAsUntouched();
      debugger
    }).catch((error: any) => {
      console.error('Error fetching the data:', error);
    });
  }
  get fa() { return this.specialityForm.controls; }

  onSelectChange(event: any):void{
    // const selectedItem = this.selectedList.find(item => item['PROVIDER TAXONOMY CODE'] === event);
    // if (selectedItem) {
    //   this.specialityModel.description = selectedItem['PROVIDER TAXONOMY DESCRIPTION: TYPE, CLASSIFICATION, SPECIALIZATION'];
    // }
  }

  onEdit(): void {
    alert("Clicked!");
  }
  onDelete(): void {
    alert("Clicked!");
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.specialityForm.invalid) {
      return;
    }
    else {
      this.specialityModel.isactive = true;
      this.facilitiesService.saveFacilityType(this.specialityModel).subscribe((data: any) => {
        if (data = 'success') {
          this.getAllSpeciality();
          // this.toastr.success('registration details added successfully', 'Success', { timeOut: 3000 });
          this.isOpen = false;
          this.specialityModel = {};
          this.specialityForm.markAsUntouched();
          // this.getAllRegistration();
        }
      })
      debugger
      // console.log("valid");
    }
  }


  getAllSpeciality() {
    this.facilitiesService.getAllFacilityTypeList().subscribe((res: any) => {
      this.selectedList = res;
      debugger
    })
  }
}
