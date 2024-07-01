import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ClinicService {
    countries: any[] = [];
    states: any[] = [];
    cities: any[] = [];
    constructor(
        private httpClient: HttpClient
    ) { }
    async getAllAddressData() {
        const apiUrl = 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json';
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
    public getTimeZone(): Observable<any[]> {
        return this.httpClient.get<any[]>('assets/json/timezone.json');
    }
    uploadFacilityImage(img: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.UploadPrimaryFacilityImageURL, img);
    }
    savePrimaryFacility(data: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.savePrimaryFacilityURL, data);
    }
    getAllRegistration(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getAllRegistrationURL);
    }
}