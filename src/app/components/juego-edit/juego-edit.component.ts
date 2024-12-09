import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JuegoService, Juego } from '../../services/juego.service'; // Importa el servicio

@Component({
  selector: 'app-juego-edit',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './juego-edit.component.html',
  styleUrls: ['./juego-edit.component.css'],
})
export class JuegoEditComponent implements OnInit {
  juegoForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private juegoService: JuegoService // Inyecta el servicio
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario
    this.juegoForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anioPublicacion: [
        '',
        [Validators.required, Validators.min(1000), Validators.max(9999)],
      ],
      categoria: ['', Validators.required],
    });

    // Cargar datos del juego si es necesario
    const juegoId = this.route.snapshot.paramMap.get('id');
    if (juegoId) {
      this.cargarJuego(juegoId);
    }
  }

  cargarJuego(id: string): void {
    this.juegoService.getJuegoById(Number(id)).subscribe({
      next: (juego: Juego) => {
        this.juegoForm.patchValue(juego); // Carga los datos del juego en el formulario
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos del juego.';
        console.error(err);
      },
    });
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
    this.router.navigate(['/juegos']); // Redirige al usuario a la lista de juegos o al inicio
  }
}
