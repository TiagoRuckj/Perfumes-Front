import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfumeService } from '../Perfume.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfume-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfume-detalles.component.html',
  styleUrls: ['./perfume-detalles.component.css'],
})
export class PerfumeDetallesComponent implements OnInit {
  perfume: any;

  constructor(
    private route: ActivatedRoute,
    private perfumeService: PerfumeService
  ) {}

  ngOnInit() {
    const idPerfume = Number(this.route.snapshot.paramMap.get('idPerfume'));
    
    this.perfumeService.getPerfume(idPerfume).subscribe(
      (data) => {
        this.perfume = data;
      },
      (error) => {
        console.error('Error al obtener perfume:', error);
      }
    );
  }
}
