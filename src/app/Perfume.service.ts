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
        return this.http.get<any[]>('http://localhost:3000/perfumes/all/'+ pagina, {headers});
    }

    deletePerfume(idPerfume: number): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.delete('http://localhost:3000/perfumes/delete/' + idPerfume, {headers});
    }

    getPerfume(idPerfume: number): Observable<Perfume> {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get<Perfume>('http://localhost:3000/perfumes/' + idPerfume, {headers});
    }
}