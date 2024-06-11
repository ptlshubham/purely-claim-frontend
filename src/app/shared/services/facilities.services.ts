import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class FacilitiesService {
    async getAllTaxonomyCode() {
        const apiUrl = 'https://data.cms.gov/data-api/v1/dataset/113eb0bc-0c9a-4d91-9f93-3f6b28c0bf6b/data';
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);  // You can process the data further here
            return data;
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    }
    constructor(
        private httpClient: HttpClient
    ) { }

    saveFacilityType(data: any): Observable<any> {
        debugger
        return this.httpClient.post<any>(ApiService.saveFacilityTypeURL, data);
    }
    getAllFacilityTypeList(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getAllServicesURL);
    }
    removeFacilityType(id: any): Observable<any> {
        debugger
        return this.httpClient.get<any>(ApiService.removeFacilityTypeURL + id);
    }
    saveSpeciality(data: any): Observable<any> {
        debugger
        return this.httpClient.post<any>(ApiService.saveSpecialityURL, data);
    }
    getAllSpecialityDetails(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getAllSpecialityDetailsURL);
    }
    removeSpecialtyDetails(id: any): Observable<any> {
        debugger
        return this.httpClient.get<any>(ApiService.RemoveSpecialtyDetailsURL + id);
    }
    updateSpecialityDetails(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateSpecialityDetailsURL, admin);
    }
}