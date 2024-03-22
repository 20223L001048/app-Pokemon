import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';  

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.logeado) {
      return true; // Permitir la navegación si el usuario está autenticado
    } else {
      this.router.navigate(['/home']); // Redirigir al usuario a la página de inicio si no está autenticado
      return false;
    }
  }
}
