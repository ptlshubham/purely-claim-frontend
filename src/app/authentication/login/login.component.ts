import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';

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
  ) { }
  ngOnInit(): void {
    localStorage.clear();

    if (localStorage.getItem('authenticated')) {
      localStorage.removeItem('authenticated');

    }

    this.form = this.formBuilder.group({
      email: ['admin@gmail.com', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['123456', Validators.required],
    });
  }

  loginFormSubmit() {
    if (this.form.valid) {
      this.auth.login();
    }
  }
  togglePassword() {
    this.passwordClass = !this.passwordClass;
    this.passwordType = this.passwordClass ? 'text' : 'password';
  }
}
