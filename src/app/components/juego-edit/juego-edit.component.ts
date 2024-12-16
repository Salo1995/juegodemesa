import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { JuegoService } from '../../services/juego.service';

@Component({
  selector: 'app-juego-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule], // Agrega CommonModule y HttpClientModule
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
    private juegoService: JuegoService
  ) {}

  ngOnInit(): void {
    this.juegoForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anioPublicacion: [null, [Validators.required, Validators.min(1000)]],
      categoria: ['', Validators.required],
    });

    const juegoId = this.route.snapshot.paramMap.get('id');
    if (juegoId) {
      this.cargarJuego(juegoId);
    }
  }

  cargarJuego(id: string): void {
    this.juegoService.getJuegoById(Number(id)).subscribe({
      next: (juego) => {
        this.juegoForm.patchValue(juego);
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos del juego.';
        console.error(err);
      },
    });
  }

  onSubmit(): void {
    if (this.juegoForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.juegoService.updateJuego(Number(id), this.juegoForm.value).subscribe({
          next: () => {
            alert('Juego actualizado con éxito');
            this.router.navigate(['/juegos']);
          },
          error: (err) => {
            this.errorMessage = 'Error al actualizar el juego.';
            console.error(err);
          },
        });
      }
    }
  }

  cancelar(): void {
    this.router.navigate(['/juegos']);
  }
}
