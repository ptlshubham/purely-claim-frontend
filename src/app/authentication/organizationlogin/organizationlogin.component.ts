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

  org: UntypedFormGroup;
  submitted: false;
  routes: any;

  constructor(private formBuilder: UntypedFormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    debugger
    this.org = this.formBuilder.group({

      email: ['admin@gmail.com', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['123456', Validators.required],
    });
  }
  login() {
    this.loginService.login(this.org.value).subscribe(data => {
      debugger
      localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);//{ encrypt: true }//
      localStorage.setItem('role', data[0].role);//{ encrypt: true }//
      localStorage.setItem('authenticationToken', data[0].token);//{ encrypt: true }//
      localStorage.setItem('salonid', data[0].salonid);//{ encrypt: true }//
      localStorage.setItem('email', data[0].email);//{ encrypt: true }//


      this.router.navigate(['/dashboard']);
      // }
    })
  }




  get f() {
    return this.org.controls;
  }


}