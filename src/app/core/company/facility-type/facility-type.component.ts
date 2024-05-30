import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
// import { MatDialog } from '@angular/material/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddFacilitiesComponent } from '../add-facilities/add-facilities.component';
import { Sort } from '@angular/material/sort';
import { pageSelection } from 'src/app/shared/models/models';
import { FormControl, FormControlName, FormGroup, Validators, UntypedFormGroup, FormBuilder, UntypedFormBuilder } from '@angular/forms';
import { FacilityType } from 'src/app/shared/models/models';
import { FacilitiesService } from 'src/app/shared/services/facilities.services';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-facility-type',
  templateUrl: './facility-type.component.html',
  styleUrls: ['./facility-type.component.scss']
})
export class FacilityTypeComponent implements OnInit {
  public routes = routes;
  selectedList: any = [];
  facilityTypeModel: any = {};
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


  constructor(
    private formBuilder: UntypedFormBuilder,
    private facilitiesService: FacilitiesService
  ) {
    this.getAllfacilityType();

  }

  // public facType: FormGroup;
  facType!: UntypedFormGroup;
  submitted = false;

  ngOnInit(): void {
    this.facType = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{1,20}$/)]],
    })
  }

  get fa() { return this.facType.controls; }

  public onSubmit(): void {
    this.submitted = true;
    if (this.facType.invalid) {
      return;
    }
    else {
      this.facilityTypeModel.isactive = true;
      this.facilitiesService.saveFacilityType(this.facilityTypeModel).subscribe((data: any) => {
        if (data = 'success') {
          this.getAllfacilityType();
          // this.toastr.success('registration details added successfully', 'Success', { timeOut: 3000 });
          this.isOpen = false;
          this.facilityTypeModel = {};
          this.facType.markAsUntouched();
          // this.getAllRegistration();
        }
      })
      debugger
      // console.log("valid");
    }
  }

  onEdit(): void {
    alert("Clicked!");
  }
  removeFacilityType1(id:any): void {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.facilitiesService.removeFacilityType(id).subscribe(() => {
        })
        this.getAllfacilityType();
        Swal.fire('Deleted!', 'registration  details has been deleted.', 'success');
      }
    });

  }
  getAllfacilityType() {
    this.facilitiesService.getAllFacilityTypeList().subscribe((res: any) => {
      this.selectedList = res;
      debugger
    })
  }
}
