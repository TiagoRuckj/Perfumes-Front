import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';
import { Perfume } from './Perfume';



@Injectable({
    providedIn: 'root'
  })

  export class ClasificacionesService {
    constructor(private http: HttpClient) { }

    getOneClasificacion(idPerfume: number): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get<any>('http://localhost:8080/clasificaciones/'+ idPerfume, {headers});

    }

    getAllClasificaciones(idPerfume: number): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get<any[]>('http://localhost:8080/clasificaciones/all/'+ idPerfume, {headers});
    }

    addClasificacion(idPerfume: number, idClasificacion: number): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.post('http://localhost:8080/clasificaciones/add', {idPerfume, idClasificacion}, {headers});
    }
  }