import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfumeService } from '../Perfume.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-perfume',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-perfume.component.html',
  styleUrls: ['./editar-perfume.component.css']
})
export class EditarPerfumeComponent implements OnInit {
  perfumeService = inject(PerfumeService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  perfume: any = { nombre: '', notas: '' };
  mensaje: string = '';

  ngOnInit() {
    // Obtener el ID del perfume desde la URL
    const idPerfume = this.route.snapshot.paramMap.get('idPerfume');

    if (idPerfume) {
      this.perfumeService.getPerfume(+idPerfume).subscribe({
        next: (data) => {
          this.perfume = data; // Cargar los datos en el formulario
        },
        error: () => {
          this.mensaje = "Error al cargar los datos del perfume.";
        }
      });
    }
  }

  editarPerfume() {
    if (!this.perfume.nombre || !this.perfume.notas) {
      this.mensaje = "Por favor, completa todos los campos.";
      return;
    }

    this.perfumeService.editarPerfume(Number(this.route.snapshot.paramMap.get('idPerfume')), this.perfume).subscribe({
      next: () => {
        this.mensaje = "Perfume editado con éxito.";
      },
      error: () => {
        this.mensaje = "Hubo un error al editar el perfume.";
      }
    });
  }

  volverAHome() {
    this.router.navigate(['/home']);
  }
}
