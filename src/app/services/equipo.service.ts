import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor( private http: HttpClient) { }

  getEquipo( idEquipo: any ): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify({ id: idEquipo } );

    return this.http.post<any>( environment.basdeURL + 'dispositivo', json, { headers });
  }

  getEquipos( id: any ): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify({ idCliente: id } );

    return this.http.post<any>( environment.basdeURL + 'dispositivos', json, { headers })
        .pipe(
            delay(50)
        );
  }

  agregarEquipo( equipo: any): Observable<any>{
    return this.http.post<any>( environment.basdeURL + 'add_dispositivo', equipo);
  }

  actualizarEquipo( equipo: any  ): Observable<any>{
    return this.http.post<any>( environment.basdeURL + 'update_dispositivo', equipo);
  }

  borrarEquipo(idEquipo: any): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify({ id: idEquipo } );
    return this.http.post<any>( environment.basdeURL + 'delete_dispositivo', json, { headers });
  }


}
