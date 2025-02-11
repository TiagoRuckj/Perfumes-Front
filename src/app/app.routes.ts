import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { AuthGuard, AuthGuardAdmin } from './authGuard.service';
import { HomeComponent } from './home/home.component';
import { PerfumeDetallesComponent } from './perfume-detalles/perfume-detalles.component';
import { ListasComponent } from './listas/listas.component';
import { ListasDetallesComponent } from './listas-detalles/listas-detalles.component';
import { EditarPerfumeComponent } from './editar-perfume/editar-perfume.component';
import { AgregarPerfumeComponent } from './agregar-perfume/agregar-perfume.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'registrarse',
        component: RegistrarComponent,
        title: 'Registrarse'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        canActivate: [AuthGuard]
    },
    {
        path: 'perfume/:idPerfume',
        component: PerfumeDetallesComponent,
        title: 'Perfume',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'listas',
        component: ListasComponent,
        title: 'Listas',
        canActivate: [AuthGuard]
    },
    {
        path: 'lista/:idLista',
        component: ListasDetallesComponent,
        title: 'Lista',
        canActivate: [AuthGuard]
    },
    {
        path: 'editarPerfume/:idPerfume',
        component: EditarPerfumeComponent,
        title: 'Editar Perfume',
        canActivate: [AuthGuardAdmin]
    },
    {
        path: 'agregarPerfume',
        component: AgregarPerfumeComponent,
        title: 'Agregar Perfume',
        canActivate: [AuthGuardAdmin]
    }
];
