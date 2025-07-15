import { Injectable } from '@angular/core';
import { AuthenticationResponse } from '../model/Response/authenticationResponse';
import {  CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class
AuthService implements CanActivate {

  constructor(private readonly router: Router) { }


  canActivate(): boolean {
    const isAuthenticated = this.getCookies();

    if (isAuthenticated === null || isAuthenticated === undefined) {
      this.router.navigate(['/']); // Redirige a login si no está autenticado
      return false;
    }

    return true;
  }


  setCoockies(response: AuthenticationResponse){
    sessionStorage.setItem('Authentication',JSON.stringify(response))
  }


  getCookies(): AuthenticationResponse | null{
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const data = sessionStorage.getItem('Authentication');


      if(!data)
        return null

      const sesion = JSON.parse(data);
      return sesion
    }else{
      return null;
    }

  }

  clearAll(): void {
    sessionStorage.clear();
  }







}


