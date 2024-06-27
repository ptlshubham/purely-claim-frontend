import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    // userLogin(email: any, pass: any) {
    //     const data = {
    //         email: email,
    //         pass: pass,
    //     };
    //     return this.http.post(ApiService.userLoginURL, data);
    // }

    // adminLogin(email: any, pass: any) {
    //     const data = {
    //         email: email,
    //         pass: pass,
    //     };
    //     return this.http.post(ApiService.adminLoginURL, data);
    // }
    // public getStateFromJson(): Observable<any[]> {
    //     return this.http.get<any[]>('assets/json/state.json');
    // }
    // public getCityFromJson(): Observable<any[]> {
    //     return this.http.get<any[]>('assets/json/state-city.json');
    // }

    userLogin(email: any, pass: any): Observable<any> {

        const data = {
            email: email,
            password: pass,
        };

        return this.http.post<any>(ApiService.getUserLoginURL, data);
    }
    forgotPwd(admin: any): Observable<any> {

        return this.http.post<any>(ApiService.forgotPasswordURL, admin);
    }
    getOneTimePwd(admin: any): Observable<any> {
        return this.http.post<any>(ApiService.getOneTimePasswordURL, admin)
    }
    // changePassword(admin: ForgotPwd): Observable<any> {
    //     return this.http.post<any>(ApiService.getOneTimePasswordURL, admin)
    // }
    updatePassword(admin: any): Observable<any> {
        return this.http.post<any>(ApiService.updatePasswordURL, admin);
    }
    changePassword(admin: any) {
        return this.http.post<any>(ApiService.updatePasswordURL, admin);
    }
    CheckPassword(data: any) {
        return this.http.post(ApiService.ChackForPasswordURL, data);
    }
    UpdateLogout(data: any) {
        return this.http.post(ApiService.updateLogoutDetailsURL, data);
    }
    UnlockScreen(pass: any, values: any): Observable<any> {
        const data = {
            id: values.uid,
            password: pass
        }
        return this.http.post<any>(ApiService.UnlockScreenLockURL, data);
    }
    getUserData(id: any) {
        return this.http.get(ApiService.getUserDataByIdURL + id);
    }

    saveregistartion(data: any): Observable<any> {
        debugger
        return this.http.post<any>(ApiService.saveRegistrationDetailsURL, data);
    }
    saveUserdata(userData: any): Observable<any> {
        debugger
        const staticData = {
            email: userData.email,
            clinicId: userData.id,
            password: '123456',
            role: 'SubAdmin'
        };
        return this.http.post<any>(ApiService.saveUserdataURL, staticData);
    }
}
