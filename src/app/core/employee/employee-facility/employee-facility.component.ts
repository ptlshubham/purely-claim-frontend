import { Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { employeeList, pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { employeeService } from 'src/app/shared/services/employee.service';
import Swal from 'sweetalert2';


let coun: any;

@Component({
  selector: 'app-employee-facility',
  templateUrl: './employee-facility.component.html',
  styleUrls: ['./employee-facility.component.scss']
})
export class EmployeeFacilityComponent {
  private formBuilder: UntypedFormBuilder
  public employeefacility: FormGroup;
  public routes = routes;
  dataSource!: MatTableDataSource<employeeList>;
  public currentPage = 1;
  public pageIndex = 0;
  public pageSize = 10;
  public limit: number = this.pageSize;
  public skip = 0;
  public totalPages = 0;
  public pageNumberArray: Array<number> = [];
  public totalData = 0;
  public pageSelection: Array<pageSelection> = [];
  employeelist: any = [];
  public serialNumberArray: Array<number> = [];

  constructor(
    private employeeService: employeeService,
  ) { }


  ngOnInit(): void {
    this.validateForm();
    
  }
  private validateForm(): void {
    this.employeefacility = new FormGroup({
      Name: new FormControl('', Validators.required),
      Ename: new FormControl('', Validators.required),
    })
  }
  private getTableData(): void {
    this.employeelist = [];
    this.serialNumberArray = [];

    this.employeeService.getAllEmployeeTypeList().subscribe(
      (data: any[]) => {
        this.totalData = data.length; // Assuming totalData is the count of items
        data.map((res: employeeList, index: number) => {
          const serialNumber = index + 1;
          if (index >= this.skip && serialNumber <= this.limit) {
            this.employeelist.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
        this.dataSource = new MatTableDataSource<employeeList>(this.employeelist);
        this.calculateTotalPages(this.totalData, this.pageSize);
      },
      // (error: any) => {
      //   console.error('Error loading facility list:', error);
      // }
    );
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
  getAllemployeeType() {
    this.employeeService.getAllEmployeeTypeList().subscribe((res: any) => {
      this.employeelist = res;
      this.getTableData();

    });
  }
  // public sortData(sort: Sort): void {
  //   const data = this.employeefacility.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.employeefacility = data;
  //   } else {
  //     this.employeefacility = data.sort((a: any, b: any) => {
  //       const aValue = (a as any)[sort.active];
  //       const bValue = (b as any)[sort.active];
  //       return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
  //     });
  //   }
  // }
  public sortData(sort: any): void {
    const data = this.employeelist.slice();
    if (!sort.active || sort.direction === '') {
      this.employeelist = data;
    } else {
      this.employeelist = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
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
        this.employeeService.removeFacilityType(id).subscribe(() => {
        })
        this.getAllemployeeType();
        Swal.fire('Deleted!', 'registration  details has been deleted.', 'success');
      }
    });
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
  send(): void{
    console.log(coun);
  }
}
