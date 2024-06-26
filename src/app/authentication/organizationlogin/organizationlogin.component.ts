import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-organizationlogin',
  templateUrl: './organizationlogin.component.html',
  styleUrls: ['./organizationlogin.component.scss']
})
export class OrganizationloginComponent implements OnInit {


  public selectedValue !: string;
  public loginModel: any = {};

  org: UntypedFormGroup;
  submitted: false;
  routes: any;
  registermodel: any;

  constructor(private formBuilder: UntypedFormBuilder,
    private loginService: LoginService,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.org = this.formBuilder.group({

      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', Validators.required],
    });
  }
  login() {
    this.loginModel
    debugger
    this.loginService.login(this.loginModel).subscribe(data => {
      debugger
      // if (data[0].role == 'Admin') {

      // localStorage.setItem('lastOutTime', data[0].last_login);//{ encrypt: true }// // "mÆk¬�k§m®À½½°¹¿¯..."
      // localStorage.setItem('lastInTime', data[0].last_login,); //{ encrypt: true }//
      localStorage.setItem('UserName', data[0].firstname + '' + data[0].lastname);//{ encrypt: true }//
      localStorage.setItem('role', data[0].role);//{ encrypt: true }//
      this.router.navigate(['/dashboard']);
      // }
    })
  }




  get f() {
    return this.org.controls;
  }


}