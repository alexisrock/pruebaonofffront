import { Component, ContentChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BackService } from '../../service/backservice';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TareaRequest } from '../../model/Request/tareaRequest';
import { LoaddingComponent } from "../../Shared/loadding/loadding.component";
import { MenuComponent } from "../../Shared/menu/menu.component";


@Component({
  selector: 'app-create',
  imports: [CommonModule, ReactiveFormsModule, LoaddingComponent, MenuComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
   loading$: Observable<boolean> | undefined;
   isCorrect: boolean = false;
   message: string = ""
   @ContentChild("loading")
   customLoadingIndicator: TemplateRef<any> | null = null;
   miFormulario!: FormGroup;

   constructor(private readonly backService: BackService) {
    this.loading$ = backService.loading$;
    this.backService.loadingOff();
    this.miFormulario = new FormGroup({
      tarea: new FormControl('', Validators.required),
      descripcion: new FormControl('', [Validators.required])
    });


   }



   ShowMessage(data: { isCorrect: boolean, mensaje: string }){
    this.backService.loadingOn()
    this.message = data.mensaje
    this.isCorrect = data.isCorrect
    setTimeout(() => {  this.backService.loadingOff();}, 6000)
  }



  onSubmit() {
    if (this.miFormulario.valid) {
      let request = {} as TareaRequest
      request.IsCompleted = false
      request.NameTarea = this.miFormulario.get('tarea')?.value
      request.DescriptionTarea = this.miFormulario.get('descripcion')?.value
      this.backService.CrearTarea(request)
      .subscribe({
        next: (data)=>{
          this.ShowMessage({isCorrect: true, mensaje: data.message})
          this.miFormulario.get('tarea')?.reset()
          this.miFormulario.get('descripcion')?.reset()
        },
        error:(error)=>{
          this.ShowMessage({isCorrect: false, mensaje: error.message})

        }})

    } else {
      this.miFormulario.markAllAsTouched();
    }
  }

}
