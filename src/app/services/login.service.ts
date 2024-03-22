import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logeado: boolean = false;

  constructor() {}

  iniciarSesion(usuario: string, contrasenia: string): boolean {
    // Simulación de autenticación exitosa
    if (usuario !== '' && contrasenia !== '') {
      this.logeado = true;
      return true;
    } else {
      this.logeado = false;
      return false;
    }
  }

  cerrarSesion(): void {
    // Lógica para cerrar sesión y eliminar el token
    this.logeado = false;
  }
}

