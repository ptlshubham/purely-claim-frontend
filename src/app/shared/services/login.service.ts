import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { User } from '../models/auth.models';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private http: HttpClient) { }

    login(data: any): Observable<any> {
        let value = {
            email: data.email,
            password: data.password
        }
        return this.http.post<any>(ApiService.loginOrganizationUserURL, value);
    }

    UserLogin(data: any): Observable<any> {
        let value = {
            email: data.email,
            password: data.password
        }
        return this.http.post<any>(ApiService.userLoginURl, value)
    }
    // sendApprovalEmail(data: any): Observable<any> {
    //     debugger
    //     return this.http.post<any>(ApiService.sendApprovalEmailURL, data);
    // }
}
