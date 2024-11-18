import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juego-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './juego-edit.component.html',
  styleUrls: ['./juego-edit.component.css'],
})
export class JuegoEditComponent implements OnInit {
  juegoForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.juegoForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anioPublicacion: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      genero: ['', Validators.required],
    });

    // Cargar datos del juego si es necesario
    const juegoId = this.route.snapshot.paramMap.get('id');
    if (juegoId) {
      this.cargarJuego(juegoId);
    }
  }

  cargarJuego(id: string): void {
    // Lógica para cargar los datos del juego (simulada aquí)
    // Puedes hacer una llamada al servicio para obtener el juego por ID
    console.log(`Cargando datos del juego con ID: ${id}`);
  }

  onSubmit(): void {
    if (this.juegoForm.valid) {
      // Lógica para guardar los cambios
      console.log('Guardando cambios:', this.juegoForm.value);
      alert('Cambios guardados con éxito');
      this.router.navigate(['/juegos']); // Redirige a la lista de juegos
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  cancelar(): void {
    // Redirige al usuario a la lista de juegos o al inicio
    this.router.navigate(['/juegos']);
  }
}
