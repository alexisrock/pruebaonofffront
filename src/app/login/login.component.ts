import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationRequest } from '../model/Request/authenticationRequest';
import { BackService } from '../service/backservice';
import { AuthService } from '../service/auth.service';
import { Router, RouterModule } from '@angular/router';

import { LoaddingComponent } from "../Shared/loadding/loadding.component";

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoaddingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fg!: FormGroup;
  loading: boolean = false;
  message: string = ""


  constructor(private readonly service: BackService, private readonly auth: AuthService, public router: Router) {
    this.updateDatos();
  }

  updateDatos() {
    this.fg = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required])
    });
  }




  sendForm() {

    this.service.loadingOn();

    if (this.fg.valid) {
      let request = {} as AuthenticationRequest;
      request.Email = this.fg.get('Email')?.value;
      request.Password = btoa(this.fg.get('Password')?.value);
      this.service.Login(request)
        .subscribe({
          next: (data) => {
            this.service.loadingOff();
            if (data.IdRol !== 3) {
              this.auth.setCoockies(data);
              this.router.navigateByUrl('home');
            } else {
              this.showMessage("El usuario no tiene ningun rol asignado por favor contactese con el administrador del sitio")
            }

          },
          error: (error) => {
            this.service.loadingOff();
          }
        })
    }
  }

  showMessage(mensaje: string) {
    this.loading = true
    this.message = mensaje;
    setTimeout(() => { this.message = ""; this.loading = false }, 6000)

  }

}
