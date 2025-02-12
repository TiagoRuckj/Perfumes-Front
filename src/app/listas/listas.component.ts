import { Component, OnInit } from '@angular/core';
import { ListaService } from '../Lista.service';
import { ListaComponent } from "../lista/lista.component";  // Servicio para obtener y eliminar listas
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listas',
  standalone: true,
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css'],
  imports: [ListaComponent, CommonModule, FormsModule, RouterModule]
})
export class ListasComponent implements OnInit {
  listasUsuario: any[] = [];  // Aquí almacenaremos las listas del usuario
  mostrarPopup: boolean = false;  // Controlar si el popup está visible
  nuevoNombreLista: string = '';  // Nombre de la nueva lista

  constructor(private listaService: ListaService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerListas();
  }

  obtenerListas() {
    this.listaService.getAllListas().subscribe(
      (data) => {
        this.listasUsuario = data;  // Asignamos las listas recibidas al array
      },
      (error) => {
        console.error('Error al obtener las listas:', error);
      }
    );
  }

  abrirPopup() {
    this.mostrarPopup = true;
  }

  // Cerrar el popup sin agregar nada
  cerrarPopup() {
    this.mostrarPopup = false;
    this.nuevoNombreLista = '';
  }

  // Agregar una nueva lista
  agregarLista() {
    if (this.nuevoNombreLista.trim()) {
      this.listaService.addLista(this.nuevoNombreLista).subscribe((nuevaLista) => {
        this.listasUsuario.push(nuevaLista);  // Agregar la nueva lista a la lista local
        this.cerrarPopup();  // Cerrar el popup
      });
    } else {
      alert('Por favor, ingresa un nombre para la lista.');
    }
  }

  eliminarLista(idLista: number) {
    this.listaService.deleteLista(idLista).subscribe(
      () => {
        this.listasUsuario = this.listasUsuario.filter(lista => lista.idLista !== idLista);  // Eliminamos la lista localmente
      },
      (error) => {
        console.error('Error al eliminar la lista:', error);
      }
    );
  }

  volverHome() {
    this.router.navigate(['/home']);  // Ruta para ir al Home
  }
}
