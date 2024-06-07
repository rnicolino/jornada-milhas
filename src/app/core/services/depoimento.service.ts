import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Depoimento } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class DepoimentoService {

  private apiUrl: String = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  listar():Observable<Depoimento[]>{
    return this.http.get<Depoimento[]>(`${this.apiUrl}/depoimentos`);
  }
}
