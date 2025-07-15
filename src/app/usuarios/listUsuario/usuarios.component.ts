
import { Component } from '@angular/core';
import { MenuComponent } from "../../Shared/menu/menu.component";
import {  Router, RouterModule } from '@angular/router';
import { UserResponse } from '../../model/Response/userResponse';
import { NgFor } from '@angular/common';
import { BackService } from '../../service/backservice';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-usuarios',
  imports: [NgFor, MenuComponent, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  usuarios: UserResponse[] = []
  idUsuario: number |undefined =0


  constructor(private readonly service: BackService, private readonly router: Router, private readonly auth: AuthService) {
    this.getAllUsers()
    this.idUsuario = this.auth.getCookies()?.IdUsuario;
  }


  getAllUsers(){
    this.service.GetAllusuarios()
    .subscribe({
      next: (data)  =>{
        this.usuarios = data
      }, error: (error)  =>{
      }
    })
  }


  eliminarUsuario(idUsuario: number){
    this.service.EliminarUsuario(idUsuario)
    .subscribe({
      next: (data)  =>{
        this.getAllUsers()
      }, error: (error)  =>{
      }
    })
  }


  editarUsuario(usuario: UserResponse){
    this.service.setCurrentUsuarioResponse(usuario);
    this.router.navigate(['usuario/editar']);

  }

}
