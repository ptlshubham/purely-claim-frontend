import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.scss']
})
export class AddClinicComponent {
  public routes = routes;
  constructor(

  ) {

  }
}
