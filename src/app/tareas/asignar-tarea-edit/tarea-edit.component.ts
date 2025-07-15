import { Component } from '@angular/core';
import { MenuComponent } from "../../Shared/menu/menu.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Tareas } from '../../model/Response/tareasListResponse';
import { BackService } from '../../service/backservice';
import { UserResponse } from '../../model/Response/userResponse';
import { CommonModule } from '@angular/common';
import { TareaUpdateRequest } from '../../model/Request/tareaupdateRequest';
import { LoaddingComponent } from "../../Shared/loadding/loadding.component";
import { AsignacionTareasCreateRequest } from '../../model/Request/asignacionTareasCreateRequest';


@Component({
  selector: 'app-asignar-tarea-edit',
  imports: [CommonModule, MenuComponent, ReactiveFormsModule, LoaddingComponent],
  templateUrl: './tarea-edit.component.html',
  styleUrl: './tarea-edit.component.scss'
})
export class TareaEditComponent {

  fg!: FormGroup
  tareas: Tareas[] = [];
  tarea = {} as Tareas;
  usuarios: UserResponse[] = [];
  IsTareaEdit: boolean = false
  loading: boolean = false;
  message: string = ""
  idTarea!: number

  private tareaPorAsignarserviceSubscription: Subscription | undefined;
  private tareaIsPorAsignarserviceSubscription: Subscription | undefined;

  constructor(private readonly backService: BackService) {
    this.initialComponent()
  }

  initialComponent() {
    this.fg = new FormGroup({
      NameTarea: new FormControl('', [Validators.required]),
      Usuario: new FormControl(''),
      DescriptionTarea: new FormControl('')
    })


    this.backService.GetAllusuarios().subscribe({

      next: (data) => {
        this.usuarios = data.filter(x => x.Idrol != 3)
      }, error: (error) => {

      }

    })


    this.backService.GetAllTareasAsignadas()
      .subscribe({
        next: (data) => {
          this.tareas = data
        },
        error: (error) => {

        }
      })


    this.tareaIsPorAsignarserviceSubscription = this.backService.currentIsTareaSinAsingnar.subscribe(
      isTareas => {
        this.IsTareaEdit = isTareas
      })


    this.tareaPorAsignarserviceSubscription = this.backService.currentTareaSinAsingnar.subscribe(
      tarea => {
        if (tarea) {
          this.fg.patchValue({
            NameTarea: tarea.NameTarea || '',
            DescriptionTarea: tarea.DescriptionTarea || '',
            Usuario: ''
          });
          this.idTarea = tarea.Id
        }
      })


  }

  sendForm() {
    this.backService.loadingOn()
    this.sendTarea()

    let usuario =parseInt(this.fg.get('Usuario')?.value)

    if ( usuario > 0) {
      console.log(usuario)
      console.log("usuario", usuario)
      this.sendAsignacionTarea()
    }

  }


  sendTarea() {
    let request = {} as TareaUpdateRequest
    request.DescriptionTarea = this.fg.get('DescriptionTarea')?.value
    request.NameTarea = this.fg.get('NameTarea')?.value
    request.IsCompleted = false
    request.IdTarea = this.idTarea
    this.backService.EditarTarea(request).subscribe({
      next: (data) => {
        this.backService.loadingOff()
        this.showMessage(data.message)
      }, error: (error) => {
        this.backService.loadingOff()
      }
    })
  }


  sendAsignacionTarea() {
    if (this.idTarea  > 0) {
      let request = {} as AsignacionTareasCreateRequest
      request.IdTarea =  this.idTarea;
      request.IdUsuario = this.fg.get('Usuario')?.value
      this.backService.AsignarTarea(request).subscribe({
        next: (data) => {
          this.backService.loadingOff()
          this.showMessage(data.message)
        }, error: (error) => {
          this.backService.loadingOff()
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
