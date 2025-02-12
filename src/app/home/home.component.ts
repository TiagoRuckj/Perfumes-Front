import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfumeService } from '../Perfume.service';
import { AuthService } from '../auth.service';
import { PerfumeComponent } from '../perfume/perfume.component';
import { Perfume } from '../Perfume';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PerfumeComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  perfumeService = inject(PerfumeService);
  authService = inject(AuthService);
  paginaActual: number = 1;
  perfumes: any[] = [];
  isAdmin = false;

  // Control del campo de búsqueda
  searchControl = new FormControl('');

  constructor(private router: Router) {}

  async ngOnInit() {
    this.authService.getDecodedToken().subscribe({
      next: (decodedToken) => {
        if (decodedToken && decodedToken.result?.isAdmin) {
          this.isAdmin = decodedToken.result.isAdmin;
        }
      },
      error: (error) => {
        console.error('Error al obtener el token:', error);
      }
    });

    this.loadPerfumes();

    // Configurar el debounce para la búsqueda
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500), // Espera 500ms después de la última entrada
        distinctUntilChanged() // Evita hacer la misma búsqueda repetida
      )
      .subscribe(value => {
        this.buscarPerfume(value || '', this.paginaActual);
      });
  }

  loadPerfumes() {
    this.perfumeService.getPerfumesPorPagina(this.paginaActual).subscribe(
      (data: Perfume[]) => {
        this.perfumes = data;
      },
      (error) => {
        console.error('Error al cargar perfumes:', error);
      }
    );
  }

  buscarPerfume(nombre: string, paginaActual: number) {
    if (!nombre) {
      this.loadPerfumes(); // Si el campo está vacío, carga todos los perfumes
      return;
    }
    
    this.perfumeService.buscarPerfume(nombre, paginaActual).subscribe(
      (data: Perfume[]) => {
        this.perfumes = data;
      },
      (error) => {
        console.error('Error en la búsqueda de perfumes:', error);
      }
    );
  }

  siguiente(): void {
    this.paginaActual++;
    if (this.searchControl.value === ''){
      this.loadPerfumes();
    } else {
      this.buscarPerfume(this.searchControl.value || '', this.paginaActual);
    }
    
  }

  anterior(): void {
    if (this.paginaActual > 1 && this.searchControl.value === '') {
      this.paginaActual--;
      this.loadPerfumes();
    } else {
      this.paginaActual--;
      this.buscarPerfume(this.searchControl.value || '', this.paginaActual);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  navegarADetalles(idPerfume: number) {
    this.router.navigate([`/perfume/${idPerfume}`]);
  }

  verMisListas() {
    this.router.navigate(['/listas']);
  }

  agregarPerfume() {
    this.router.navigate(['/agregarPerfume']);
  }
}
