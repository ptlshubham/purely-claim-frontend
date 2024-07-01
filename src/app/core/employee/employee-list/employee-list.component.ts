
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { apiResultFormat, pageSelection, employeeList } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { ClinicService } from 'src/app/shared/services/clinic.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  public routes = routes;
  public employeeList: Array<employeeList> = [];
  dataSource!: MatTableDataSource<employeeList>;
  public validationForm: FormGroup;

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
  selectedValue: any;
  selectedList1: any;
  NPI: any;
  EmployeeType: any
  selectedList2: any;
  selectedList3: any;
  selectedList4: any;
  data: any;
  formBuilder: any;
  Timezone: any;
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  allData: any = [];
  ngOnInit() {
    this.validateForm();
    this.selectedList1 = [
      { value: 'Orthopedics' },
      { value: 'Radiology' },
      { value: 'Dentist' },
      // Add more options as needed
    ];
    this.NPI = [
      { value: 'Individual' },
      { value: 'Organization' },

      // Add more options as needed
    ];
    this.Timezone = [
      { value: 'Chicago (GMT-5)' },
      { value: 'Denver (GMT-6)' },
      { value: 'Phoenix (GMT-7)' },
      { value: 'Los Angeles (GMT-7)' },
      { value: 'Anchorage (GMT-8)' },
      { value: 'Honolulu (GMT-10)' }

    ]
    this.selectedList2 = [
      { value: 'Select City' },
      { value: 'Alaska' },
      { value: 'Los Angeles' },
      // Add more options as needed
    ];
    this.EmployeeType = [
      { value: 'Full Time' },
      { value: 'Part Time' },

      // Add more options as needed
    ];
    this.selectedList3 = [
      { value: 'Select Country' },
      { value: 'Usa' },
      { value: 'Uk' },
      { value: 'Italy' },
      // Add more options as needed
    ];
    this.selectedList4 = [
      { value: 'Select State' },
      { value: 'Alaska' },
      { value: 'California' },
      // Add more options as needed
    ];
  }
  constructor(
    private clinicService: ClinicService
  ) {
    // this.clinicService.getAllAddressData().then((data: any) => {
    //   this.allData = data;
    //   this.countries = [...new Set(data.map((item: any) => item.country))];
    // });
  }
  get f() { return this.validationForm.controls; }

  private validateForm(): void {
    this.validationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      DateOfBirth: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      Postal: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      SSN: new FormControl('', Validators.required),
      primaryFacility: new FormControl('', Validators.required),
      jobtitle: new FormControl('', Validators.required),
      DateofJoin: new FormControl('', Validators.required),
      NPI: new FormControl('', Validators.required)
    })
  }
  private getTableData(): void {
    this.employeeList = [];
    this.serialNumberArray = [];

    // this.data.getEmployeeList().subscribe((data: apiResultFormat) => {
    //   this.totalData = data.totalData;
    //   data.data.map((res: employeeList, index: number) => {
    //     const serialNumber = index + 1;
    //     if (index >= this.skip && serialNumber <= this.limit) {
    //       this.employeeList.push(res);
    //       this.serialNumberArray.push(serialNumber);
    //     }
    //   });
    //   this.dataSource = new MatTableDataSource<employeeList>(this.employeeList);
    //   this.calculateTotalPages(this.totalData, this.pageSize);
    // });
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.employeeList = this.dataSource.filteredData;
  }

  public sortData(sort: Sort): void {
    const data = this.employeeList.slice();
    if (!sort.active || sort.direction === '') {
      this.employeeList = data;
    } else {
      this.employeeList = data.sort((a, b) => {
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

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    this.getTableData();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  backToTable() {
    this.isOpen = false;
  }
  addToList() {
    this.isOpen = true;
  }
  onCountryChange(country: string) {
    this.states = this.allData.filter((item: any) => item.country === country).map((item: any) => item.subcountry);
    this.cities = [];
    this.validationForm.controls['State'].reset();
    this.validationForm.controls['City'].reset();
  }
  onStateChange(state: string) {
    this.cities = this.allData.filter((item: any) => item.subcountry === state);
    this.validationForm.controls['City'].reset();
  }
}
