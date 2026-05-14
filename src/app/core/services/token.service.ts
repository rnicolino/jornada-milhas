import { Injectable } from '@angular/core';

const KEY = "token";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  salvarToken(token: string): void {
    return localStorage.setItem(KEY, token);
  }

  excluirToken(): void {
    localStorage.removeItem(KEY);
  }

  retornarToken(): string {
    return localStorage.getItem(KEY) ?? '';
  }

  possuiToken(): boolean {
    return !!this.retornarToken();
  }
}
