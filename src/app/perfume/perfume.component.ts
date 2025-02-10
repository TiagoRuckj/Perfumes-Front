import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfumeService } from '../Perfume.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfume.component.html',
  styleUrls: ['./perfume.component.css']
})
export class PerfumeComponent {
  perfumeService = inject(PerfumeService);

  @Input() perfume: any;
  @Output() seleccionPerfume = new EventEmitter<number>();
  @Input() isAdmin: boolean = false;

  verDetalles() {
    this.seleccionPerfume.emit(this.perfume.idPerfume);
  }
  editPerfume() {
    console.log(`Editar perfume: ${this.perfume.nombre}`);
    // Aquí puedes redirigir a la página de edición
  }

  deletePerfume() {
    
    if (confirm(`¿Seguro que deseas eliminar "${this.perfume.nombre}"?`)) {
      this.perfumeService.deletePerfume(this.perfume.idPerfume).subscribe(() => {
        console.log(`Perfume "${this.perfume.nombre}" eliminado.`);
        location.reload();
      });
    }
      
  }
    
}
