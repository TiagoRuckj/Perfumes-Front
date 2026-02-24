import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';
import { Perfume } from './Perfume';



@Injectable({
    providedIn: 'root'
  })

  export class PerfumeService {
    constructor(private http: HttpClient) { }

    getPerfumesPorPagina(pagina: number): Observable<Perfume[]> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get<any[]>('http://localhost:8080/perfumes/all/'+ pagina, {headers});
    }

    deletePerfume(idPerfume: number): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.delete('http://localhost:8080/perfumes/delete/' + idPerfume, {headers});
    }

    getPerfume(idPerfume: number): Observable<Perfume> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get<Perfume>('http://localhost:8080/perfumes/' + idPerfume, {headers});
    }

    addPerfume(perfume: Perfume): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.post('http://localhost:8080/perfumes/add', perfume, {headers});
    }

    editarPerfume(idPerfume:number, perfume: Perfume): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.put('http://localhost:8080/perfumes/update/'+idPerfume, perfume, {headers});
    }

    buscarPerfume(nombre: string, paginaActual: number): Observable<Perfume[]> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get<Perfume[]>('http://localhost:8080/perfumes/buscar/' + nombre + '/'+ paginaActual, {headers});
    }
}