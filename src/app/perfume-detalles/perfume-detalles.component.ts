import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PerfumeService } from '../Perfume.service';
import { CommonModule } from '@angular/common';
import { ClasificacionesService } from '../Clasificaciones.service';

@Component({
  selector: 'app-perfume-detalles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfume-detalles.component.html',
  styleUrls: ['./perfume-detalles.component.css'],
})
export class PerfumeDetallesComponent implements OnInit {
  perfume: any;
  idPerfume: number | undefined;
  clasificacionUsuario: number | undefined;
  promedioClasificacion: number | undefined;
  emojiPromedio: string | undefined;

  caras = ['😡', '🙁', '😐', '😊', '😍']; // Emojis para cada clasificación

  constructor(
    private route: ActivatedRoute,
    private perfumeService: PerfumeService,
    private clasificacionesService: ClasificacionesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idPerfume = Number(this.route.snapshot.paramMap.get('idPerfume'));

    this.perfumeService.getPerfume(this.idPerfume).subscribe(
      (data) => {
        this.perfume = data;
      },
      (error) => {
        console.error('Error al obtener perfume:', error);
      }
    );

    this.clasificacionesService.getOneClasificacion(this.idPerfume).subscribe(
      (data) => {
        this.clasificacionUsuario = data.clasificacion_idClasificacion;
      },
      (error) => {
        console.error('Error al obtener clasificaciones:', error);
      }
    );

    this.clasificacionesService.getAllClasificaciones(this.idPerfume).subscribe(
      (data) => {
        if (data.length > 0) {
          // Calcular promedio
          const sum = data.reduce((acc: number, item: any) => acc + item.clasificacion_idClasificacion, 0);
          this.promedioClasificacion = sum / data.length;

          // Determinar emoji correspondiente
          this.emojiPromedio = this.caras[Math.round(this.promedioClasificacion) - 1] || '❓';
        } else {
          this.promedioClasificacion = undefined;
          this.emojiPromedio = '❓';
        }
      },
      (error) => {
        console.error('Error al obtener clasificaciones generales:', error);
      }
    );
  }

  cambiarClasificacion(nuevaClasificacion: number) {
    if (this.idPerfume) {
      this.clasificacionesService
        .addClasificacion(this.idPerfume, nuevaClasificacion)
        .subscribe(
          () => {
            this.clasificacionUsuario = nuevaClasificacion;
          },
          (error) => {
            console.error('Error al actualizar la clasificación:', error);
          }
        );
    }
  }

  volverHome() {
    this.router.navigate(['/home']); // Redirigir a Home
  }
}
