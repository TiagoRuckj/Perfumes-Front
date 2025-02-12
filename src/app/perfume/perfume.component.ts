import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfumeService } from '../Perfume.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-perfume',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfume.component.html',
  styleUrls: ['./perfume.component.css']
})
export class PerfumeComponent {
  perfumeService = inject(PerfumeService);

  constructor(private router: Router) {}

  @Input() perfume: any;
  @Output() seleccionPerfume = new EventEmitter<number>();
  @Input() isAdmin: boolean = false;

  verDetalles() {
    this.seleccionPerfume.emit(this.perfume.idPerfume);
  }
  editPerfume(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/editarPerfume/'+ this.perfume.idPerfume]);
    // Aquí puedes redirigir a la página de edición
  }

  deletePerfume(event: MouseEvent) {
    event.stopPropagation();
    if (confirm(`¿Seguro que deseas eliminar "${this.perfume.nombre}"?`)) {
      this.perfumeService.deletePerfume(this.perfume.idPerfume).subscribe(() => {
        console.log(`Perfume "${this.perfume.nombre}" eliminado.`);
        location.reload();
      });
    }
      
  }
    
}
