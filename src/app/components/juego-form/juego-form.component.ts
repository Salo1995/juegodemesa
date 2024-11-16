import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JuegoService, Juego } from '../../services/juego.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-juego-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './juego-form.component.html',
    styleUrls: ['./juego-form.component.css']
})
export class JuegoFormComponent implements OnInit {
    juegoForm: FormGroup;
    juegoId: string | null = null;
    isEditMode = false; // Variable para verificar si estamos en modo edición
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private juegoService: JuegoService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.juegoForm = this.fb.group({
            titulo: ['', Validators.required],
            autor: ['', Validators.required],
            añoPublicacion: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
            genero: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        // Verificar si estamos en modo edición
        this.juegoId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.juegoId;

        if (this.isEditMode) {
            // Cargar datos del juego para edición
            this.juegoService.getJuego(this.juegoId!).subscribe({
                next: (juego) => this.juegoForm.patchValue(juego),
                error: (err) => {
                    console.error('Error al cargar juego para edición:', err);
                    this.errorMessage = 'Error al cargar el juego. Intente nuevamente.';
                }
            });
        }
    }

    onSubmit(): void {
        if (this.juegoForm.valid) {
            const juego: Juego = this.juegoForm.value;
            this.errorMessage = null; // Limpiar mensaje de error

            if (this.isEditMode) {
                // Modo edición
                this.juegoService.updateJuego(this.juegoId!, juego).subscribe({
                    next: () => {
                        alert('Juego actualizado con éxito');
                        this.router.navigate(['/juegos']);
                    },
                    error: (err) => {
                        console.error('Error al actualizar el juego:', err);
                        this.errorMessage = 'No se pudo actualizar el juego. Intente nuevamente.';
                    }
                });
            } else {
                // Modo agregar
                this.juegoService.addJuego(juego).subscribe({
                    next: () => {
                        alert('Juego agregado con éxito');
                        this.router.navigate(['/juegos']);
                    },
                    error: (err) => {
                        console.error('Error al agregar el juego:', err);
                        this.errorMessage = 'No se pudo agregar el juego. Intente nuevamente.';
                    }
                });
            }
        } else {
            this.errorMessage = 'Por favor, complete todos los campos requeridos.';
        }
    }
    cancelar(): void {
        this.router.navigate(['/juegos']); // Redirige a la lista de juegos
    }
    // Método para mostrar los mensajes de error
    getErrorMessage(controlName: string): string {
        const control = this.juegoForm.get(controlName);
        if (control?.hasError('required')) {
            return 'Este campo es requerido';
        }
        if (controlName === 'añoPublicacion' && (control?.hasError('min') || control?.hasError('max'))) {
            return 'Año de publicación debe ser entre 1000 y 9999';
        }
        return '';
    }
}
