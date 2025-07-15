import { UserCreateRequest, UserupdateRequest } from './../model/Request/userCreateRequest';
import { AuthenticationRequest } from './../model/Request/authenticationRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignacionTarasUsuario, ListAsignacionTarasUsuario, Tareas, tareasListResponse } from '../model/Response/tareasListResponse';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseResponse } from '../model/Response/baseResponse';
import { TareaCheck } from '../model/Request/tareaCheck';
import { TareaRequest } from '../model/Request/tareaRequest';
import { AuthenticationResponse } from '../model/Response/authenticationResponse';
import { AsignacionTareaRequest, ListAsignacionTareaRequest } from '../model/Request/asignacionTareaRequest';
import { UserListResponse, UserResponse } from '../model/Response/userResponse';
import { TareaUpdateRequest } from '../model/Request/tareaupdateRequest';
import { AsignacionTareasCreateRequest } from '../model/Request/asignacionTareasCreateRequest';
import { RolListResponse } from '../model/Response/rolResponse';
import { ListContactoResponse } from '../model/Response/contactoResponse';
import { ContactoRequest } from '../model/Request/contactoRequest';


@Injectable({
  providedIn: 'root'
})
export class BackService {

  constructor(private readonly httpclient: HttpClient) { }

  urlBase: string = "https://9ztsw4f7-44342.use2.devtunnels.ms/";
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private readonly currentTareasSubject: BehaviorSubject<Tareas[]> = new BehaviorSubject({} as Tareas[]);
  public readonly currentTareas: Observable<Tareas[]> = this.currentTareasSubject.asObservable();

  private readonly currentTareasasignadasSubject: BehaviorSubject<AsignacionTareaRequest[]> = new BehaviorSubject({} as AsignacionTareaRequest[]);
  public readonly currentTareasAsingnadas: Observable<AsignacionTareaRequest[]> = this.currentTareasasignadasSubject.asObservable();

  private readonly currentTareaSinAsignarSubject: BehaviorSubject<Tareas> = new BehaviorSubject({} as Tareas);
  public readonly currentTareaSinAsingnar: Observable<Tareas> = this.currentTareaSinAsignarSubject.asObservable();

  private readonly currentIsTareaSinAsignarSubject: BehaviorSubject<boolean> = new BehaviorSubject({} as boolean);
  public readonly currentIsTareaSinAsingnar: Observable<boolean> = this.currentIsTareaSinAsignarSubject.asObservable();

  private readonly currentUsuarioResponseSubject: BehaviorSubject<UserResponse> = new BehaviorSubject({} as UserResponse);
  public readonly currentUsuarioResponse: Observable<UserResponse> = this.currentUsuarioResponseSubject.asObservable();

  private readonly currentTareasUsuarioSubject: BehaviorSubject<AsignacionTarasUsuario[]> = new BehaviorSubject({} as AsignacionTarasUsuario[]);
  public readonly currentTareasUsuario: Observable<AsignacionTarasUsuario[]> = this.currentTareasUsuarioSubject.asObservable();

  setCurrentTareas(tareasCurrent: Tareas[]): void {
    this.currentTareasSubject.next(tareasCurrent);
  }

  setCurrentTareasAsignadas(tarasAsignadas: AsignacionTareaRequest[]) {
    this.currentTareasasignadasSubject.next(tarasAsignadas);
  }

  setCurrentTareasinAsignar(tareasinAsignar: Tareas){
    this.currentTareaSinAsignarSubject.next(tareasinAsignar)
  }

  setCurrentIsTareasinAsignar(isTareasinAsignar: boolean){
    this.currentIsTareaSinAsignarSubject.next(isTareasinAsignar)
  }

  setCurrentUsuarioResponse(userResponse: UserResponse){
    this.currentUsuarioResponseSubject.next(userResponse);
  }

  setCurrentTareasUsuario(tareasCurrent: AsignacionTarasUsuario[]): void {
    this.currentTareasUsuarioSubject.next(tareasCurrent);
  }




  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }




  Login(request: AuthenticationRequest) {
    return this.httpclient.post<AuthenticationResponse>(this.urlBase + 'api/Authentication/Authentication', request);
  }

  crearUsuario(request: UserCreateRequest) {
    return this.httpclient.post<BaseResponse>(this.urlBase + 'api/Authentication/Create', request);
  }

  GetAllTareas() {
    return this.httpclient.get<tareasListResponse>(this.urlBase + 'api/AsignarTarea/GetAllTareasSinAsignar');
  }

  GetAllTareasAsignadas() {
    return this.httpclient.get<ListAsignacionTareaRequest>(this.urlBase + 'api/AsignarTarea/GetAllTareasAsignadas');
  }


  checkTareaCompletada(request: TareaCheck) {
    return this.httpclient.patch<BaseResponse>(this.urlBase + 'api/Tarea/Update', request);
  }


  EliminarTarea(id: number) {
    return this.httpclient.delete<BaseResponse>(this.urlBase + 'api/Tarea/Delete/' + id);
  }

  CrearTarea(request: TareaRequest) {
    return this.httpclient.post<BaseResponse>(this.urlBase + 'api/Tarea/Create', request);
  }

  EliminarAsignacionTarea(idAsignacion: number){
    return this.httpclient.delete<BaseResponse>(this.urlBase + `api/AsignarTarea/Delete/${idAsignacion}`);
  }

  GetAllusuarios() {
    return this.httpclient.get<UserListResponse>(this.urlBase + 'api/Usuario/GetAll');
  }

  EditarTarea(request: TareaUpdateRequest) {
    return this.httpclient.patch<BaseResponse>(this.urlBase + 'api/Tarea/Update', request);
  }

  AsignarTarea(request: AsignacionTareasCreateRequest){
    return this.httpclient.post<BaseResponse>(this.urlBase + 'api/AsignarTarea/Create', request);
  }

  EliminarUsuario(idUser:number){
    return this.httpclient.delete<BaseResponse>(this.urlBase + `api/Usuario/Delete/${idUser}`);
  }

  EditarUsuario(User:UserupdateRequest){
    return this.httpclient.put<BaseResponse>(this.urlBase + 'api/Usuario/update', User);
  }


  GetRoles(){
    return this.httpclient.get<RolListResponse>(this.urlBase + 'api/Rol/GetAll');
  }

  GetContactos(){
    return this.httpclient.get<ListContactoResponse>(this.urlBase + 'api/Contacto/GetAll');
  }

  CrearContacto(request: ContactoRequest){
    return this.httpclient.post<BaseResponse>(this.urlBase + 'api/Contacto/Create', request);
  }

  EliminarContacto(id: number){
    return this.httpclient.delete<BaseResponse>(this.urlBase + `api/Contacto/Delete/${id }`);
  }

  GetTareasUsuario(id: number|undefined) {
    return this.httpclient.get<ListAsignacionTarasUsuario>(this.urlBase + `api/AsignarTarea/GetById/${id }`);
  }

}
