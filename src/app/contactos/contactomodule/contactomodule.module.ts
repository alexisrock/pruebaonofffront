import { ListcontactoComponent } from './../listcontacto/listcontacto.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { RouterModule, Routes } from '@angular/router';



export const routes: Routes = [
  { path: 'contactos',canActivate: [AuthService], component: ListcontactoComponent},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactomoduleModule {



}
