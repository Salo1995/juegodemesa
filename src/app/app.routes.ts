import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'; // Ruta correcta del LoginComponent
import { RegisterComponent } from './auth/register/register.component'; // Ruta correcta del RegisterComponent

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: 'register', component: RegisterComponent } // Ruta para el registro
];
