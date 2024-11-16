import { Component, OnInit } from '@angular/core';
import { LibroService, Libro } from '../../services/libro.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-libros-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './libros-list.component.html',
    styleUrls: ['./libros-list.component.css']
})
export class LibrosListComponent implements OnInit {
    libros: Libro[] = [];

    constructor(
        private libroService: LibroService,
        private authService: AuthService,  // Inyecta AuthService aquí
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cargarLibros();
    }

    cargarLibros(): void {
        this.libroService.getLibros().subscribe({
            next: (data) => {
                this.libros = data;
                console.log("Datos cargados en libros-list:", data);
            },
            error: (err) => {
                console.error("Error al cargar libros:", err);
            }
        });
    }

    editarLibro(id: string): void {
        this.router.navigate(['/libros/editar', id]);
    }

    eliminarLibro(id: string): void {
        if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
            this.libroService.deleteLibro(id).subscribe({
                next: () => {
                    alert('Libro eliminado con éxito');
                    this.libros = this.libros.filter(libro => libro.id !== id);
                },
                error: (err) => console.error('Error al eliminar el libro:', err)
            });
        }
    }

    agregarNuevoLibro(): void {
        this.router.navigate(['/libros/nuevo']);
    }

    // Método para cerrar sesión
    logout(): void {
        this.authService.logout(); // Llama al método logout del servicio de autenticación
        this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
    }
}
