import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para el modelo de datos de juegos de mesa
interface Juegodemesa {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class JuegodemesaService {
  private apiUrl = 'http://localhost:8080/juegodemesa';

  // Inyectar HttpClient en el constructor
  constructor(private http: HttpClient) {}

  // Método para obtener todos los juegos de mesa
  getJuegodemesa(): Observable<Juegodemesa[]> {
    return this.http.get<Juegodemesa[]>(this.apiUrl);
  }

  // Método para obtener un juego de mesa por su ID
  getJuegodemesaById(id: number): Observable<Juegodemesa> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Juegodemesa>(url);
  }

  // Método para crear un nuevo juego de mesa
  createJuegodemesa(juegodemesa: Juegodemesa): Observable<Juegodemesa> {
    return this.http.post<Juegodemesa>(this.apiUrl, juegodemesa);
  }

  // Método para actualizar un juego de mesa
  updateJuegodemesa(id: number, juegodemesa: Juegodemesa): Observable<Juegodemesa> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Juegodemesa>(url, juegodemesa);
  }

  // Método para eliminar un juego de mesa
  deleteJuegodemesa(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
