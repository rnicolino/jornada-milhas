import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { PessoaUsuaria } from '../types/type';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);

  constructor(private tokenService: TokenService) { 
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT();
      const token = this.tokenService.retornarToken();
      const userData = JSON.parse(atob(token.split('.')[1])) as PessoaUsuaria;
      this.userSubject.next(userData);
    }
  }

  private decodificarJWT(): void {
    const token = this.tokenService.retornarToken();
    const user = jwtDecode<PessoaUsuaria>(token);
    this.userSubject.next(user);
  }

  retornarUser(){
    return this.userSubject.asObservable();
  }

  salvarToken(token: string): void {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout(): void {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  } 

  estaLogado(): boolean {
    return this.tokenService.possuiToken();
  }

}
