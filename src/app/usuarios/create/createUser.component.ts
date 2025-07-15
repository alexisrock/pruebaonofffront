import { Component } from '@angular/core';
import { MenuComponent } from "../../Shared/menu/menu.component";
import { UsuarioComponent } from "../usuario/usuario.component";

@Component({
  selector: 'app-create',
  imports: [MenuComponent, UsuarioComponent],
  templateUrl: './createUser.component.html',
  styleUrl: './createUser.component.scss'
})
export class CreateUserComponent {

}
