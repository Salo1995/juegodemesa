import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JuegoService, Juego } from '../../services/juego.service';

@Component({
  selector: 'app-juego-add',
  templateUrl: './juego-add.component.html',
  styleUrls: ['./juego-add.component.css']
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
    // Inicializa el formulario
    this.juegoForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anioPublicacion: [null, [Validators.required, Validators.min(1000), Validators.max(9999)]],
      categoria: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.juegoForm.valid) {
      const nuevoJuego: Juego = this.juegoForm.value;
      this.juegoService.addJuego(nuevoJuego).subscribe({
        next: (data) => {
          console.log('Juego creado:', data);
          alert('Juego registrado con éxito');
          this.router.navigate(['/juegos']); // Redirige a la lista de juegos
        },
        error: (err) => {
          this.errorMessage = 'Error al registrar el juego.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  cancelar(): void {
    this.router.navigate(['/juegos']); // Redirige al usuario a la lista de juegos
  }
}
