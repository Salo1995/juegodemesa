import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { JuegoEditComponent } from './components/juego-edit/juego-edit.component';
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'juegos/editar/:id', component: JuegoEditComponent },
  { path: 'inicio', component: InicioComponent }, 
];
