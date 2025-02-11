import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-perfume-lista',
  templateUrl: './perfume-lista.component.html',
  styleUrls: ['./perfume-lista.component.css']
})
export class PerfumeListaComponent {
  @Input() perfume: any; // Recibe el perfume de la lista
  @Output() eliminar = new EventEmitter<number>(); // Emite el ID del perfume a eliminar

  eliminarPerfume(event: Event) {
    event.stopPropagation(); // Evita que se active el evento de ver detalles
    this.eliminar.emit(this.perfume.idPerfume);
  }
}
