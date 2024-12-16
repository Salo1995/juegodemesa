import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { JuegoService } from '../../services/juego.service'; // Importa tu servicio

@Component({
  selector: 'app-juego-add',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule], // Agrega HttpClientModule aquí
  templateUrl: './juego-add.component.html',
  styleUrls: ['./juego-add.component.css'],
})
export class JuegoAddComponent implements OnInit {
  juegoForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private juegoService: JuegoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.juegoForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anioPublicacion: [null, [Validators.required, Validators.min(1000)]],
      categoria: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.juegoForm.valid) {
      const nuevoJuego = this.juegoForm.value;
      this.juegoService.addJuego(nuevoJuego).subscribe({
        next: () => {
          alert('Juego registrado con éxito');
          this.router.navigate(['/juegos']);
        },
        error: (err) => {
          this.errorMessage = 'Error al registrar el juego.';
          console.error(err);
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/juegos']);
  }
}
