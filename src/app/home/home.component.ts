import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfumeService } from '../Perfume.service';
import { AuthService } from '../auth.service';
import { PerfumeComponent } from '../perfume/perfume.component';
import { Perfume } from '../Perfume';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PerfumeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  perfumeService = inject(PerfumeService);
  authService = inject(AuthService);
  paginaActual: number = 1;

  constructor(private router: Router) { }

  perfumes: any[] = [];
  isAdmin = false;

  async ngOnInit() {
    this.authService.getDecodedToken().subscribe({
      next: (decodedToken) => {
        if (decodedToken && decodedToken.result?.isAdmin) {
          this.isAdmin = decodedToken.result.isAdmin
        }
      },
      error: (error) => {
        console.error('Error al obtener el token:', error);
      }
    }) // Extrae el rol del token
    this.loadPerfumes();
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

  siguiente(): void {
    this.paginaActual++;
    this.loadPerfumes();
  }

  anterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.loadPerfumes();
    }
  }

  logout() {
    localStorage.removeItem('token'); // Eliminar el token
    this.router.navigate(['/login']); // Redirigir al login
  }

  navegarADetalles(idPerfume: number) {
    this.router.navigate([`/perfume/${idPerfume}`]);
  }
}
