import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { User } from '../models/auth.models';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { LoginAdmin } from 'src/app/authentication/organizationlogin/organizationlogin.mdel';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private http: HttpClient) { }

    login(data: any): Observable<any> {
        debugger
        return this.http.post<any>(ApiService.loginOrganizationUserURL, data);
    }
}
