import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Juego {
    id: string;
    titulo: string;
    autor: string;
    añoPublicacion: number;
    genero: string;
}

@Injectable({
    providedIn: 'root'
})
export class JuegoService {
    private apiUrl = 'http://localhost:3000/juego';

    constructor(private http: HttpClient) {}

    getJuegos(): Observable<Juego[]> {
        return this.http.get<Juego[]>(this.apiUrl);
    }

    getJuego(id: string): Observable<Juego> {
        return this.http.get<Juego>(`${this.apiUrl}/${id}`);
    }

    addJuego(juego: Juego): Observable<Juego> {
        return this.http.post<Juego>(this.apiUrl, juego);
    }

    updateJuego(id: string, juego: Juego): Observable<Juego> {
        return this.http.put<Juego>(`${this.apiUrl}/${id}`, juego);
    }

    deleteJuego(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
