import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PerfumeService } from '../Perfume.service';
import { Perfume } from '../Perfume';

@Component({
  selector: 'app-agregar-perfume',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agregar-perfume.component.html',
  styleUrl: './agregar-perfume.component.css'
})
export class AgregarPerfumeComponent {
  perfumeService = inject(PerfumeService);
  router = inject(Router);

  nombre: string = '';
  notas: string = '';
  mensaje: string = '';

  agregarPerfume() {
    if (!this.nombre || !this.notas) {
      this.mensaje = "Por favor, completa todos los campos.";
      return;
    }

    const nuevoPerfume = {
      nombre: this.nombre,
      notas: this.notas
    };

    this.perfumeService.addPerfume(nuevoPerfume as Perfume).subscribe({
      next: () => {
        this.mensaje = "Perfume agregado con éxito.";
        this.nombre = '';
        this.notas = '';
      },
      error: () => {
        this.mensaje = "Hubo un error al agregar el perfume, ya existe con ese nombre.";
      }
    });
  }

  volverAHome() {
    this.router.navigate(['/home']);
  }
}
