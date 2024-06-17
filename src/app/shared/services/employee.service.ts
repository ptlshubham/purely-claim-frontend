import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class employeeService {
    constructor(
        private httpClient: HttpClient
    ) { }
    getAllEmployeeTypeList(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getAllServicesURL);
    }
    removeFacilityType(id: any): Observable<any> {
        debugger
        return this.httpClient.get<any>(ApiService.removeFacilityTypeURL + id);
    }
}