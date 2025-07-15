import { TestBed } from '@angular/core/testing';

import { BackService } from './backservice';
import {  HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tareas } from '../model/Response/tareasListResponse';
import { BaseResponse } from '../model/Response/baseResponse';
import { TareaRequest } from '../model/Request/tareaRequest';
import { TareaCheck } from '../model/Request/tareaCheck';


describe('BackService', () => {
  let service: BackService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(BackService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // Verifica que no queden peticiones pendientes
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Mostrar todas las tareas', () => {
    // Definir un dummy response de acuerdo a la interfaz tareasListResponse
    const dummyResponse: Tareas[]=
       [
        { IdTarea: 1, NameTarea: 'Tarea 1', DescriptionTarea: 'sdfsdfsd',  IsCompleted: true },
        { IdTarea: 2, NameTarea: 'Tarea 2', DescriptionTarea: 'klsdfsdfsd', IsCompleted: false }
      ]
    ;

    // Suscribirse al método y esperar la respuesta
    service.GetAllTareas().subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    // Espera que se haga una petición GET a la URL correcta
    const req = httpMock.expectOne(`${service.urlBase}api/Tarea/GetAll`);
    expect(req.request.method).toBe('GET');

    // Responde con el dummy response
    req.flush(dummyResponse);
  });


  it('Crear tarea', () => {
    const response: BaseResponse = {
      message: "Tarea creada con exito"
    }

    let request: TareaRequest={
      NameTarea: "hacer el arroz",
      DescriptionTarea: "hacer el arroz",
      IsCompleted: false
    }


    service.CrearTarea(request).subscribe(response => {
      expect(response).toEqual(response);
    });

    const req = httpMock.expectOne(`${service.urlBase}api/Tarea/Create`);
    expect(req.request.method).toBe('POST');

    req.flush(response);
  })

  it('Actualizar estado de la tarea', () => {
    const response: BaseResponse = {
      message: "Tarea creada con exito"
    }

    let request: TareaCheck = {
      IdTarea: 1,
      IsCompleted: true
    }

    service.checkTareaCompletada(request).subscribe(response => {
      expect(response).toEqual(response);
    });

    const req = httpMock.expectOne(`${service.urlBase}api/Tarea/Update`);
    expect(req.request.method).toBe('PATCH');

    req.flush(response);


  });

  it('Eliminar tarea', () => {
    const response: BaseResponse = {
      message: "Tarea Eliminada con exito"
    }

    let request : number =  1
    service.EliminarTarea(request).subscribe(response => {
      expect(response).toEqual(response);
    });

    const req = httpMock.expectOne(`${service.urlBase}api/Tarea/Delete/${request}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(response);


  });





});
