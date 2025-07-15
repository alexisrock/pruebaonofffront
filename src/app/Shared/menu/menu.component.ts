import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  idRol: number |undefined =0

  constructor(private readonly service: AuthService, public router: Router, private readonly auth: AuthService) {
    this.idRol = this.auth.getCookies()?.IdRol;
  }


  CerrarSesion(){
    this.service.clearAll();
    this.router.navigateByUrl('/');
  }
}
