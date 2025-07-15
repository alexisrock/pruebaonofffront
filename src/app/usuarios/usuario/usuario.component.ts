import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackService } from '../../service/backservice';
import { UserCreateRequest } from '../../model/Request/userCreateRequest';
import { LoaddingComponent } from "../../Shared/loadding/loadding.component";

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, ReactiveFormsModule, LoaddingComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

  fg!: FormGroup;
  loading: boolean = false;
  message: string = ""

  constructor(private readonly service: BackService) {
    this.updateDatos();

  }


  updateDatos() {

    this.fg = new FormGroup({
      Nombres: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required])
    });
  }




  sendForm() {
    if (this.fg.valid) {
      this.service.loadingOn();
      let request = {} as UserCreateRequest;
      request.NameUsuario = this.fg.get('Nombres')?.value;
      request.Email = this.fg.get('Email')?.value;
      request.Password = btoa(this.fg.get('Password')?.value) ;
      this.service.crearUsuario(request)
      .subscribe({
        next: (data) =>{
          this.showMessage(data.message)
          this.fg.reset();
        }, error: (error) =>{
          this.showMessage(error.error)
      }
      })

    }
  }

  showMessage(mensaje: string) {
    this.service.loadingOff();
    this.loading = true
    this.message = mensaje;
    setTimeout(() => { this.message = "";  this.loading = false }, 6000)
  }
}
