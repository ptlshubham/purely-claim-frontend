import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { MatTableDataSource } from '@angular/material/table';
import { clientApprovalList, pageSelection } from 'src/app/shared/models/models';
import { Sort } from '@angular/material/sort';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { LoginService } from 'src/app/shared/services/login.service';
import Locals from 'ngx-editor/lib/Locals';
import { UserProfileService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-client-approval-request',
  templateUrl: './client-approval-request.component.html',
  styleUrls: ['./client-approval-request.component.scss']
})
export class ClientApprovalRequestComponent {
  public routes = routes;
  public searchDataValue = '';
  dataSource!: MatTableDataSource<clientApprovalList>;
  public ClientApprovalList: Array<clientApprovalList> = [];
  clientApprovalList: any = [];
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
  isAdded: boolean = false
  salonid: any = localStorage.getItem('salonid')
  email: any = localStorage.getItem('email')
  facilityRegistrationModel: any = {};
  constructor(
    private ClinicService: ClinicService,
    private loginService: LoginService,
    private UserProfileService: UserProfileService
  ) {
  }
  ngOnInit(): void {
    this.getAllRegistrationList();

  }
  saveUserDetails(data: any) {
    this.UserProfileService.saveUserdata(data).subscribe((res: any) => {
    })
  }



  getAllRegistrationList() {
    this.ClinicService.getAllRegistration().subscribe((res: any) => {
      this.clientApprovalList = res;
      this.getTableData();
    });
  }
  public searchData(value: any): void {
    if (this.dataSource) {
      this.dataSource.filter = value.trim().toLowerCase();
      this.clientApprovalList = this.dataSource.filteredData;
    } else {
      console.error('this.dataSource is undefined');
    }
  }
  public sortData(sort: Sort): void {
    const data = this.clientApprovalList.slice();
    if (!sort.active || sort.direction === '') {
      this.clientApprovalList = data;
    } else {
      this.clientApprovalList = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
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


  private getTableData(): void {
    this.clientApprovalList = [];
    this.serialNumberArray = [];

    this.ClinicService.getAllRegistration().subscribe(
      (data: any[]) => {
        this.totalData = data.length; // Assuming totalData is the count of items
        data.map((res: clientApprovalList, index: number) => {
          const serialNumber = index + 1;
          if (index >= this.skip && serialNumber <= this.limit) {
            this.clientApprovalList.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
        this.dataSource = new MatTableDataSource<clientApprovalList>(this.clientApprovalList);
        this.calculateTotalPages(this.totalData, this.pageSize);
      },
      // (error: any) => {
      //   console.error('Error loading facility list:', error);
      // }
    );
  }



}
