import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { UsuarioService } from '../Usuario.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  authService = inject(AuthService);
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  // Estado del modal de error
  showErrorModal = false;
  errorMessage = '';

  registerForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    contrasenia: new FormControl(''),
    isAdmin: new FormControl(false)
  });

  public register() {
    const formData = this.registerForm.value;

    const body = {
      nombre: formData.nombre,
      email: formData.email,
      contrasenia: formData.contrasenia,
      isAdmin: false
    };

    this.usuarioService.addUsuario(body).subscribe(
          (res: any) => {
            if (res) {
              this.authService.login(body).subscribe(
                (res: any) => {
                  if (res) {
                    localStorage.setItem('token', res); // Guarda el token en localStorage

                    setTimeout(() => {
                      this.router.navigate(['/home']); // Redirige al home
                    }, 200);
                  } else {
                    this.errorMessage = 'Ese email ya se encuentra registrado';
                    this.showErrorModal = true; // Muestra el modal en caso de error
                  }
                },
                (error) => {
                  console.error('Login error:', error);
                  this.showErrorModal = true; // Muestra el modal en caso de error
                }
              );
            } else {
              this.showErrorModal = true; // Muestra el modal en caso de error
            }
          },
          (error) => {
            console.error('Register error:', error);
            this.showErrorModal = true; // Muestra el modal en caso de error

      }
    );
  }

  public closeModal() {
    this.showErrorModal = false;
  }
}
