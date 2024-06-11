import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
// import { MatDialog } from '@angular/material/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddFacilitiesComponent } from '../add-facilities/add-facilities.component';
import { Sort } from '@angular/material/sort';
import { apiResultFormat, facilityList, pageSelection } from 'src/app/shared/models/models';
import { FormControl, FormControlName, FormGroup, Validators, UntypedFormGroup, FormBuilder, UntypedFormBuilder } from '@angular/forms';
import { FacilityType } from 'src/app/shared/models/models';
import { FacilitiesService } from 'src/app/shared/services/facilities.services';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
@Component({
  selector: 'app-facility-type',
  templateUrl: './facility-type.component.html',
  styleUrls: ['./facility-type.component.scss']
})
export class FacilityTypeComponent implements OnInit {
  public routes = routes;

  facilityTypeModel: any = {};
  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  dataSource!: MatTableDataSource<facilityList>;
  facilityList: any = [];
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  isOpen: boolean = false;
  facType!: UntypedFormGroup;
  submitted = false;
  searchQuery: string = '';
  filterfacilityList: any = []


  get fa() { return this.facType.controls; }

  constructor(
    private formBuilder: UntypedFormBuilder,
    private facilitiesService: FacilitiesService,
    public data: DataService
  ) { }
  ngOnInit(): void {
    this.getTableData();
    this.getAllfacilityType();
    this.dataSource = new MatTableDataSource<any>([]);
    this.facType = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{1,20}$/)]],
    })
  }
  public sortData(sort: Sort): void {
    const data = this.facilityList.slice();
    if (!sort.active || sort.direction === '') {
      this.facilityList = data;
    } else {
      this.facilityList = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  private getTableData(): void {
    this.facilityList = [];
    this.serialNumberArray = [];

    this.facilitiesService.getAllFacilityTypeList().subscribe(
      (data: any[]) => {
        this.totalData = data.length; // Assuming totalData is the count of items
        data.map((res: facilityList, index: number) => {
          const serialNumber = index + 1;
          if (index >= this.skip && serialNumber <= this.limit) {
            this.facilityList.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
        this.dataSource = new MatTableDataSource<facilityList>(this.facilityList);
        this.calculateTotalPages(this.totalData, this.pageSize);
      },
      // (error: any) => {
      //   console.error('Error loading facility list:', error);
      // }
    );
  }
  public searchData(value: any): void {
    if (this.dataSource) {
      this.dataSource.filter = value.trim().toLowerCase();
      this.facilityList = this.dataSource.filteredData;
    } else {
      console.error('this.dataSource is undefined');
    }
  }
  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }
  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  // public facType: FormGroup;

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
          this.isOpen = false;
          this.facilityTypeModel = {};
          this.facType.markAsUntouched();
        }
      })

    }
  }


  removeFacilityType(id: any): void {
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
      this.facilityList = res;
      this.getTableData();

    });
  }
  applySearchFilter() {
    debugger
    this.facilityList = this.filterfacilityList.filter((facility: any) =>
      (facility.name).toLowerCase().includes(this.searchQuery.toLowerCase())
    );

  }
}
