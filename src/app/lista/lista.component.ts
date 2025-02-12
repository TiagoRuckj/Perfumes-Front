import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  @Input() lista: any;  // Lista recibida desde el componente padre
  @Output() eliminarLista: EventEmitter<number> = new EventEmitter<number>();  // Evento para eliminar la lista

  constructor(private router: Router) {}

  eliminar(event: MouseEvent) {
    event.stopPropagation();  // Evitar que el evento llegue al padre
    this.eliminarLista.emit(this.lista.idLista);  // Emitir el id de la lista a eliminar
  }

  verDetalles() {
    this.router.navigate([`/lista/${this.lista.idLista}`]);  // Redirigir al detalle de la lista
  }
}
