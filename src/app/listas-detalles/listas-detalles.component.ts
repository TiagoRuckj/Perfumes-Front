import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaService } from '../Lista.service';
import { PerfumeListaComponent } from "../perfume-lista/perfume-lista.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-listas-detalles',
  templateUrl: './listas-detalles.component.html',
  styleUrls: ['./listas-detalles.component.css'],
  imports: [PerfumeListaComponent, CommonModule, FormsModule]
})
export class ListasDetallesComponent implements OnInit {
  lista: any;  // Información de la lista
  perfumesDeLista: any[] = [];  // Lista de perfumes ya procesados

  constructor(
    private listaService: ListaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerListaDetalles();
  }

  obtenerListaDetalles() {
    const idLista = Number(this.route.snapshot.paramMap.get('idLista'));  // Obtener el ID de la lista desde la URL
    if (idLista) {
      this.listaService.getOneLista(idLista).subscribe(
        (lista) => {
          this.lista = lista;
          // Extraemos la lista de perfumes correcta
          this.perfumesDeLista = lista.perfumes.map((p: { perfume: any; }) => p.perfume);
        },
        (error) => {
          console.error('Error al obtener la lista:', error);
        }
      );
    }
  }

  eliminarPerfume(idPerfume: number) {
    this.listaService.deletePerfume(this.lista.idLista, idPerfume).subscribe(() => {
      // Filtramos el perfume eliminado para actualizar la vista
      this.perfumesDeLista = this.perfumesDeLista.filter((p) => p.idPerfume !== idPerfume);
    }, error => {
      console.error('Error eliminando perfume:', error);
    });
  }
  
  
  volver() {
    this.router.navigate(['/listas']);  // Redirige a la página de listas
  }
}