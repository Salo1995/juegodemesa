import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
//import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    //private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirigir si el usuario ya está autenticado
    if (localStorage.getItem('userId')) {
      this.router.navigate(['/libros']);
    }

    // Inicialización del formulario de inicio de sesión
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /*onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (user) => {
          if (user) {
            // Guardar ID del usuario en localStorage y redirigir
            localStorage.setItem('userId', user.id!.toString());
            alert('Inicio de sesión exitoso');
            this.router.navigate(['/libros']);
          } else {
            alert('Credenciales incorrectas');
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        },
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }*/
}
