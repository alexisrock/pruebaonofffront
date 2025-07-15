import { Component } from '@angular/core';

import { ListComponent } from '../tareas/list/list.component';
import { BackService } from '../service/backservice';

import { CommonModule } from '@angular/common';
import { MenuComponent } from "../Shared/menu/menu.component";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [ListComponent, CommonModule, MenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {



  constructor(private readonly backService: BackService, private readonly auth: AuthService) {
    if (this.auth.getCookies()?.IdRol==1) {
      this.GetTareas();
      this.GetTareasAsignadas();
    }else{
      this.GetTareasAsignadasUsuario();
    }

  }

  GetTareas() {
    this.backService.GetAllTareas()
      .subscribe({
        next: (data) => {
          this.backService.setCurrentTareas(data)
        },
        error: (error) => {

        }
      })
  }

  GetTareasAsignadas() {
    this.backService.GetAllTareasAsignadas()
      .subscribe({
        next: (data) => {
          this.backService.setCurrentTareasAsignadas(data)
        },
        error: (error) => {

        }
      })
  }

  GetTareasAsignadasUsuario(){
    const idUsuario : number| undefined = this.auth.getCookies()?.IdUsuario;
    this.backService.GetTareasUsuario(idUsuario)
    .subscribe({
      next: (data) => {
        this.backService.setCurrentTareasUsuario(data)
      },
      error: (error) => {

      }
    })
  }

  UpdataLista() {
    if (this.auth.getCookies()?.IdRol==1) {
      this.GetTareas();
    }else{
      this.GetTareasAsignadasUsuario();
    }

  }

  UpdateAsignacionTareas(){
    this.GetTareasAsignadas();
  }

}
