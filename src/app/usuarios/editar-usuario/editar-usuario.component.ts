import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackService } from '../../service/backservice';
import { MenuComponent } from "../../Shared/menu/menu.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaddingComponent } from '../../Shared/loadding/loadding.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RolResponse } from '../../model/Response/rolResponse';
import { UserupdateRequest } from '../../model/Request/userCreateRequest';

@Component({
  selector: 'app-editar-usuario',
  imports: [CommonModule, MenuComponent, ReactiveFormsModule, LoaddingComponent],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent {

  userRsponseSubscription: Subscription | undefined;
  fg!: FormGroup;
  loading: boolean = false;
  message: string = ""
  listRol: RolResponse[] = []
  idUser: number = 0
  constructor(private readonly service: BackService, private readonly router: Router) {
    this.initialComponentes()
  }


  initialComponentes() {
        this.fg = new FormGroup({
          Nombres: new FormControl('', [Validators.required]),
          Email: new FormControl('', [Validators.required]),
          Password: new FormControl('', [Validators.required]),
          Rol: new FormControl('', [Validators.required]),
        })


    this.userRsponseSubscription = this.service.currentUsuarioResponse.subscribe(
      user => {

        if (user.Id) {
            this.fg.patchValue({
            Nombres: user.NameUsuario,
            Email: user.Email
          })
          this.idUser = user.Id
        }
        else{
          this.router.navigate(['usuario/usuarios']);
        }
      })

      this.service.GetRoles().subscribe({
        next: (value) => {
          this.listRol = value
        },error:(err) =>  {

        },


      })




  }





  sendForm(){
    if (this.fg.valid) {
      let user = {} as UserupdateRequest
      user.Id = this.idUser
      user.Email = this.fg.get('Email')?.value
      user.NameUsuario = this.fg.get('Nombres')?.value
      user.Idrol = this.fg.get('Rol')?.value
      user.Password = btoa(this.fg.get('Password')?.value)
      this.service.EditarUsuario(user).subscribe({
        next:(data) => {
          this.showMessage(data.message)
        },  error:(err)=> {
          this.showMessage(err.message)
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
