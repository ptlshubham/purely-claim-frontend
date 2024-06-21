import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { SpecialityList, apiResultFormat, pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { FacilitiesService } from 'src/app/shared/services/facilities.services';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

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

  specialityModel: any = {};

  selectedList: any = [];
  taxonomyDetail: any = [];
  SpecialityList: any = []
  isDeleted: boolean = false;
  isAdded: boolean = false
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
  specialityForm!: UntypedFormGroup;
  dataSource!: MatTableDataSource<SpecialityList>;


  public sortData(sort: Sort): void {
    const data = this.SpecialityList.slice();
    if (!sort.active || sort.direction === '') {
      this.SpecialityList = data;
    } else {
      this.SpecialityList = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  // private getTableData(): void {
  //   this.SpecialityList = [];
  //   this.serialNumberArray = [];

  // }

  constructor(
    private formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,

    private facilitiesService: FacilitiesService) {
    this.getAllTaxonomyCode();
    // this.specialityModel = {};
  }

  // public specialityForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.getTableData();

    this.getAllSpeciality();
    this.specialityForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{1,20}$/)]],
      taxonomyCode: ['', [Validators.required]],
      detail: ['', Validators.required],
      notes: ['']
    })
  }



  private getTableData(): void {
    this.SpecialityList = [];
    this.serialNumberArray = [];

    this.facilitiesService.getAllSpecialityDetails().subscribe(
      (data: any[]) => {
        this.totalData = data.length; // Assuming totalData is the count of items
        data.map((res: SpecialityList, index: number) => {
          const serialNumber = index + 1;
          if (index >= this.skip && serialNumber <= this.limit) {
            this.SpecialityList.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
        this.dataSource = new MatTableDataSource<SpecialityList>(this.SpecialityList);
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
      this.SpecialityList = this.dataSource.filteredData;
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



  getAllTaxonomyCode() {
    this.facilitiesService.getAllTaxonomyCode().then((res: any) => {
      this.selectedList = res;
      // console.log(this.selectedList[0]['MEDICARE PROVIDER/SUPPLIER TYPE DESCRIPTION']);
      this.specialityModel = {};
      this.specialityForm.markAsUntouched();
      debugger
    }).catch((error: any) => {
      console.error('Error fetching the data:', error);
    });
  }
  get fa() { return this.specialityForm.controls; }

  onSelectChange(e: any, code: any): void {
    const a = "MEDICARE PROVIDER/SUPPLIER TYPE DESCRIPTION";
    const filteredElement = this.selectedList.find((element: any) => element['PROVIDER TAXONOMY CODE'] === code);
    if (filteredElement) {
      const taxonomyDescription = filteredElement["PROVIDER TAXONOMY DESCRIPTION:  TYPE, CLASSIFICATION, SPECIALIZATION"];

      this.specialityModel.detail = filteredElement[a] + "-->" + taxonomyDescription;
    }
  }



  saveSpeciality() {
    this.submitted = true;
    if (this.specialityForm.invalid) {
      return;
    }

    else {
      if (this.specialityModel.notes === undefined) {
        this.specialityModel.notes = '';
      }
      this.facilitiesService.saveSpeciality(this.specialityModel).subscribe((data: any) => {
        if (data = 'success') {

          this.specialityModel = {};
          this.specialityForm.markAsUntouched();
          this.showAddedMsg();
        }
      })
      this.getAllSpeciality();
    }
  }


  getAllSpeciality() {
    this.facilitiesService.getAllSpecialityDetails().subscribe((res: any) => {
      this.SpecialityList = res;
      this.getTableData();

    });
  }
  removeSpeciality(id: any): void {
    debugger
    this.facilitiesService.removeSpecialtyDetails(id).subscribe(() => {
      this.isDeleted = true;
      this.showDeleteMsg()
      this.getAllSpeciality();

    })
  }

  showDeleteMsg() {
    this.isDeleted = true;
    setTimeout(() => {
      this.isDeleted = false;
    }, 3000); // or 5000 for 5 seconds
  }
  showAddedMsg() {
    this.isAdded = true;
    setTimeout(() => {
      this.isAdded = false;
    }, 3000);
  }
}
