import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ClinicService {
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
    constructor(
        private httpClient: HttpClient
    ) { }
    private apiUrl = 'https://worldtimeapi.org/api/timezone';
    getData(): Observable<any> {
        return this.httpClient.get(this.apiUrl);
    }
    uploadFacilityImage(img: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.UploadPrimaryFacilityImageURL, img);
    }
    savePrimaryFacility(data: any): Observable<any> {
        debugger
        return this.httpClient.post<any>(ApiService.savePrimaryFacilityURL, data);
    }
}