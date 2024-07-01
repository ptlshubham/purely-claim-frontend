import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public passwordClass = false;
  form: UntypedFormGroup;
  passwordType: string = 'password';

  get f() {
    return this.form.controls;
  }

  constructor(
    public auth: AuthService,
    private formBuilder: UntypedFormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }
  ngOnInit(): void {
    localStorage.clear();
    this.form = this.formBuilder.group({
      email: ['admin@gmail.com', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['123456', Validators.required],
    });
  }

  // loginFormSubmit() {
  //   if (this.form.valid) {
  //     this.auth.login();
  //   }
  // }
  togglePassword() {
    this.passwordClass = !this.passwordClass;
    this.passwordType = this.passwordClass ? 'text' : 'password';
  }
  loginFormSubmit() {
    this.loginService.UserLogin(this.form.value).subscribe(data => {
      debugger
      localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);//{ encrypt: true }//
      localStorage.setItem('email', data[0].email);//{ encrypt: true }//
      localStorage.setItem('role', data[0].role);//{ encrypt: true }//
      localStorage.setItem('authenticationToken', data[0].token);//{ encrypt: true }//
      localStorage.setItem('clinicid', data[0].clinicid);//{ encrypt: true }//
      localStorage.setItem('userid', data[0].userid);//{ encrypt: true }//

      // localStorage.setItem('email', data[0].email);//{ encrypt: true }//
      this.router.navigate(['/company/add-facilities']);
      // }
    })
  }
}
