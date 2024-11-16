import { Component, OnInit } from '@angular/core';
import { JuegoService, Juego } from '../../services/juego.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juegos-list.component.html',
  styleUrls: ['./juegos-list.component.css'],
})
export class JuegoListComponent implements OnInit {
  juegos: Juego[] = []; // Lista de juegos

  constructor(
    private juegoService: JuegoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarJuegos();
  }

  cargarJuegos(): void {
    this.juegoService.getJuegos().subscribe({
      next: (data) => {
        this.juegos = data; // Corrige el nombre de la propiedad a "juegos"
        console.log('Datos cargados en juego-list:', data);
      },
      error: (err) => {
        console.error('Error al cargar juegos:', err);
      },
    });
  }

  editarJuego(id: string): void {
    this.router.navigate(['/juego/editar', id]);
  }

  eliminarJuego(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      this.juegoService.deleteJuego(id).subscribe({
        next: () => {
          alert('Juego eliminado con éxito');
          this.juegos = this.juegos.filter((juego) => juego.id !== id); // Actualiza la lista local
        },
        error: (err) => console.error('Error al eliminar el juego:', err),
      });
    }
  }

  agregarNuevoJuego(): void {
    this.router.navigate(['/juego/nuevo']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
