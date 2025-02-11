import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PerfumeService } from '../Perfume.service';
import { ClasificacionesService } from '../Clasificaciones.service';
import { ListaService } from '../Lista.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfume-detalles',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './perfume-detalles.component.html',
  styleUrls: ['./perfume-detalles.component.css'],
})
export class PerfumeDetallesComponent implements OnInit {
  perfume: any;
  idPerfume: number | undefined;
  clasificacionUsuario: number | undefined;
  promedioClasificacion: number | undefined;
  emojiPromedio: string | undefined;
  listasUsuario: any[] = []; // Listas del usuario
  listaSeleccionada: number | undefined; // ID de la lista seleccionada
  mostrarPopup: boolean = false; // Estado del popup

  caras = ['😡', '🙁', '😐', '😊', '😍']; // Emojis para cada clasificación

  constructor(
    private route: ActivatedRoute,
    private perfumeService: PerfumeService,
    private clasificacionesService: ClasificacionesService,
    private listaService: ListaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idPerfume = Number(this.route.snapshot.paramMap.get('idPerfume'));

    // Obtener datos del perfume
    this.perfumeService.getPerfume(this.idPerfume).subscribe(
      (data) => {
        this.perfume = data;
      },
      (error) => {
        console.error('Error al obtener perfume:', error);
      }
    );

    // Obtener la clasificación del usuario
    this.clasificacionesService.getOneClasificacion(this.idPerfume).subscribe(
      (data) => {
        this.clasificacionUsuario = data.clasificacion_idClasificacion;
      },
      (error) => {
        console.error('Error al obtener clasificaciones:', error);
      }
    );

    // Obtener todas las clasificaciones y calcular promedio
    this.clasificacionesService.getAllClasificaciones(this.idPerfume).subscribe(
      (data) => {
        if (data.length > 0) {
          const sum = data.reduce((acc: number, item: any) => acc + item.clasificacion_idClasificacion, 0);
          this.promedioClasificacion = sum / data.length;
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

    // Obtener listas del usuario
    this.listaService.getAllListas().subscribe(
      (listas) => {
        this.listasUsuario = listas;
      },
      (error) => {
        console.error('Error al obtener listas del usuario:', error);
      }
    );
  }

  cambiarClasificacion(nuevaClasificacion: number) {
    if (this.idPerfume) {
      this.clasificacionesService.addClasificacion(this.idPerfume, nuevaClasificacion).subscribe(
        () => {
          this.clasificacionUsuario = nuevaClasificacion;
        },
        (error) => {
          console.error('Error al actualizar la clasificación:', error);
        }
      );
    }
  }

  agregarAPerfil() {
    if (this.listaSeleccionada && this.idPerfume) {
      this.listaService.addPerfume(this.listaSeleccionada, this.idPerfume).subscribe(
        () => {
          this.mostrarPopup = true;
          setTimeout(() => {
            this.mostrarPopup = false;
          }, 2000);
        },
        (error) => {
          console.error('Error al agregar perfume a la lista:', error);
        }
      );
    }
  }

  volverHome() {
    this.router.navigate(['/home']);
  }
}
