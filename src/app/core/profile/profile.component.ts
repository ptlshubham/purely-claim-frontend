import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// import { MustMatch } from 'src/app/account/auth/validation.mustmatch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public routes = routes;
  chanagePassword: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,

  ) { }
  ngOnInit(): void {

    this.chanagePassword = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpwd: ['', Validators.required]
    }, {
      // validator: MustMatch('password', 'confirmpwd'),
    });
  }
}
