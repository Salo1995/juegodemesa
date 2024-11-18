import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule], // Se incluye RouterModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Simula autenticación para diferentes usuarios
      if (email === 'admin@example.com' && password === 'admin123') {
        alert('Inicio de sesión exitoso como Administrador');
        this.router.navigate(['/juegos/editar/1']); // Redirige a la página de edición
      } else if (email === 'user@example.com' && password === 'user123') {
        alert('Inicio de sesión exitoso como Usuario');
        this.router.navigate(['/inicio']); // Redirige a la página de inicio
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      alert('Por favor, completa todos los campos correctamente');
    }
  }
}
