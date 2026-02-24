import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';



@Injectable({
    providedIn: 'root'
  })

  export class UsuarioService {
    constructor(private http: HttpClient) { }

    addUsuario(body: any): Observable<any> {
        return this.http.post('http://localhost:8080/usuarios/add', body);
    }
}