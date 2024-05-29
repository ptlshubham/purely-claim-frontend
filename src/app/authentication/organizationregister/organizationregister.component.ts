import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder,UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/app/shared/models/models';

@Component({
  selector: 'app-organizationregister',
  templateUrl: './organizationregister.component.html',
  styleUrls: ['./organizationregister.component.scss']
})
export class OrganizationregisterComponent implements OnInit {



  
  public selectedValue !: string  ;

  signupForm!: UntypedFormGroup;
  submitted = false;
routes: any;

registermodel: any;
 

  constructor(private formBuilder: UntypedFormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      lastname: ['', Validators.required,Validators.pattern("^[a-z ,.'-]+$/i") ],
      firstname: ['', Validators.required],
      clinicname: ['', Validators.required],
      phoneno: [ '',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      zip: ['', Validators.required],
      cliniccode: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      // password: ['', Validators.required],
    });
  }
  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        // this.authenticationService.register(this.f.email.value, this.f.password.value).then((res: any) => {
        //   this.successmsg = true;
        //   if (this.successmsg) {
        //     this.router.navigate(['']);
        //   }
        // })
          // .catch((error: string) => {
          //   this.error = error ? error : '';
          // });
      } else {
      //   this.userService.register(this.signupForm.value)
      //     .pipe(first())
      //     .subscribe(
      //       (data: any) => {
      //         this.successmsg = true;
      //         if (this.successmsg) {
      //           this.router.navigate(['/account/login']);
      //         }
      //       },
      //       (error: any) => {
      //         this.error = error ? error : '';
      //       });
      }
    }
  }
  // alphabetValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const valid = /^[A-Za-z]*$/.test(control.value);
  //     return valid ? null : { alphabet: true };
  //   };
  // }

}
