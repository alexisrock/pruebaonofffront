import { Component } from '@angular/core';
import { ContactoResponse } from '../../model/Response/contactoResponse';
import { MenuComponent } from "../../Shared/menu/menu.component";
import { CommonModule, NgFor } from '@angular/common';
import { BackService } from '../../service/backservice';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaddingComponent } from "../../Shared/loadding/loadding.component";
import { ContactoRequest } from '../../model/Request/contactoRequest';

@Component({
  selector: 'app-listcontacto',
  imports: [CommonModule, ReactiveFormsModule, MenuComponent, NgFor, LoaddingComponent],
  templateUrl: './listcontacto.component.html',
  styleUrl: './listcontacto.component.scss'
})
export class ListcontactoComponent {

  contactos: ContactoResponse[] = [];
  idRol: number | undefined = 0;
  fg!: FormGroup;
  loading: boolean = false;
  message: string = ""

  constructor(private readonly service: BackService, private readonly auth: AuthService) {
    this.idRol = this.auth.getCookies()?.IdRol;
    this.GetContactos();

    if (this.idRol != 1) {
      this.updateDatos();
    }
  }


  updateDatos() {
    this.fg = new FormGroup({
      Telefono: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Comentarios: new FormControl('', [Validators.required])
    });
  }

  GetContactos() {
    this.service.GetContactos()
      .subscribe({
        next: (value) => {
          this.contactos = value;

        }, error: (err) => {

        },
      })
  }

  Eliminar(id: number) {
    this.service.EliminarContacto(id)
      .subscribe({
        next: (value) => {
          this.GetContactos()

        }, error: (err) => {

        }
      })
  }


  sendForm() {
    if (this.fg.valid) {

      this.service.loadingOn();
      let request = {} as ContactoRequest;
      request.Comentario = this.fg.get('Comentarios')?.value;
      request.Email = this.fg.get('Email')?.value;
      request.Telefono = this.fg.get('Telefono')?.value;
      this.service.CrearContacto(request).subscribe({
        next: (value) => {
          this.showMessage(value.message);
          this.fg.reset();
        }, error: (err) => {

        }
      })
    }
  }

  showMessage(mensaje: string) {
    this.service.loadingOff();
    this.loading = true
    this.message = mensaje;
    setTimeout(() => { this.message = ""; this.loading = false }, 6000)
  }


}
