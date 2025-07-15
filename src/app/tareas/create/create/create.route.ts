import { Routes } from "@angular/router";
import { CreateComponent } from "../create.component";
import { TareaEditComponent } from "../../asignar-tarea-edit/tarea-edit.component";


export const routes: Routes = [
  { path: '', component: CreateComponent},
  { path: 'editarTarea', component: TareaEditComponent},
  { path: 'create', component: CreateComponent},

];
