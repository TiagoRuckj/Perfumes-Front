import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';




@Injectable({
    providedIn: 'root'
  })

  export class ListaService {
    constructor(private http: HttpClient) { }

    getOneLista(idLista: number): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get<any>('http://localhost:8080/listas/'+ idLista, {headers});

    }

    getAllListas(): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get<any[]>('http://localhost:8080/listas/all', {headers});
    }

    addLista(nombre: string): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.post('http://localhost:8080/listas/add', {nombre}, {headers});
    }

    deleteLista(idLista: number): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.delete('http://localhost:8080/listas/delete/'+ idLista, {headers});
    }

    addPerfume(idLista: number, idPerfume: number): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.post('http://localhost:8080/listas/addPerfume/'+ idLista, {idPerfume}, {headers});
    }

    deletePerfume(idLista: number, idPerfume: number): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.delete('http://localhost:8080/listas/deletePerfume/' + idLista + '/'+ idPerfume, {headers});
    }
    


  }