import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-organizationlogin',
  templateUrl: './organizationlogin.component.html',
  styleUrls: ['./organizationlogin.component.scss']
})
export class OrganizationloginComponent implements OnInit{
  

  public selectedValue !: string  ;

org : UntypedFormGroup;
submitted: false;
routes: any;
registermodel: any;

constructor(private formBuilder: UntypedFormBuilder,
  private router: Router) { }

ngOnInit(): void {
  this.org = this.formBuilder.group({
    
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
     password: ['', Validators.required],
  });
}

  


  
get f() {
  return this.org.controls;
}

  
}