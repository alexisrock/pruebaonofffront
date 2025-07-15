import { Routes } from '@angular/router';
import { AuthService } from './service/auth.service';


export const routes: Routes = [
  { path: '',  loadChildren:() => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'usuario',  loadChildren:() => import('./usuarios/usuario.module').then(m => m.UsuarioModule)},
  { path: 'home', canActivate: [AuthService],  loadChildren:() => import('./dashboard/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'tarea',canActivate: [AuthService],  loadChildren:() => import('./tareas/create/create/create.module').then(m => m.CreateModule)},
  { path: 'contacto',canActivate: [AuthService],  loadChildren:() => import('./contactos/contactomodule/contactomodule.module').then(m => m.ContactomoduleModule)},

];
