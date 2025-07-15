import { BackService } from '../../service/backservice';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { AsignacionTarasUsuario, Tareas } from '../../model/Response/tareasListResponse';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { TareaCheck } from '../../model/Request/tareaCheck';
import { AsignacionTareaRequest } from '../../model/Request/asignacionTareaRequest';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';



@Component({
  selector: 'app-list',
  imports: [NgFor, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent implements OnDestroy {
  @Output() event = new EventEmitter<void>();
  @Output() eventAsignacion = new EventEmitter<void>();
  idRol: number | undefined = 0
  component: number = 1

  tareas: Tareas[] = [];
  tareasAsignadas: AsignacionTareaRequest[] = []
  asignacionTareaUsuario:AsignacionTarasUsuario[]= []

  private tareaserviceSubscription: Subscription | undefined;
  private tareaAsignadasserviceSubscription: Subscription | undefined;
  private tareaUsuarioserviceSubscription: Subscription | undefined;

  constructor(private readonly backService: BackService, public router: Router, private readonly auth: AuthService) {

    this.initialStates();
  }

  initialStates() {
    this.idRol= this.auth.getCookies()?.IdRol;

    if (this.idRol==1) {
      this.tareaserviceSubscription = this.backService.currentTareas.subscribe(
        subCurrent => {
          this.tareas = subCurrent
        })

      this.tareaAsignadasserviceSubscription = this.backService.currentTareasAsingnadas.subscribe(
        tarAsig => {
          this.tareasAsignadas = tarAsig
        })

    }else{
      this.tareaUsuarioserviceSubscription = this.backService.currentTareasUsuario.subscribe(
        tareaUsuario=>{
          this.asignacionTareaUsuario = tareaUsuario

        })

    }


  }


  ngOnDestroy(): void {
    this.tareaserviceSubscription?.unsubscribe();
    this.tareaAsignadasserviceSubscription?.unsubscribe();
  }


  checkTareacompletada(idTarea: number) {
    this.backService.loadingOn();
    let request = {} as TareaCheck;
    request.IdTarea = idTarea
    request.IsCompleted = true
    this.backService.checkTareaCompletada(request)
      .subscribe({
        next: (data) => {
          this.event.emit();
        },
        error: (error) => {

        }
      })
  }


  EliminarTarea(idTarea: number) {
    this.backService.EliminarTarea(idTarea)
      .subscribe({
        next: (data) => {
          this.event.emit();
        },
        error: (error) => {

        }
      })
  }


  cambiarTablaTareas(tabla: number) {
    this.component = tabla;
  }


  eliminarAsignacionTarea(idAsignacion: number) {
    this.backService.EliminarAsignacionTarea(idAsignacion)
      .subscribe({
        next: (data) => {
          this.eventAsignacion.emit();
        },
        error: (error) => {

        }
      })
  }


  verTareaAsignada(tarea: Tareas) {
    this.backService.setCurrentTareasinAsignar(tarea);
    this.backService.setCurrentIsTareasinAsignar(false)
    this.router.navigate(['tarea/editarTarea']);
  }

}
