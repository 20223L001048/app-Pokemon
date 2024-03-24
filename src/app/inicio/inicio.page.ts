import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login.service'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  email: string = '';
  password: string = '';
  emailValid: boolean = true;
  passwordValid: boolean = true;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loginService: LoginService
  ) {}

  validateEmail() {
    this.emailValid = /^20223l001048@utcv\.edu\.mx$/.test(this.email);
  }

  validatePassword() {
    this.passwordValid = /^[a-zA-Z0-9]+$/.test(this.password);
}

  async login(registering: boolean = false) {
    // Verifica si tanto el correo como la contraseña no están vacíos
    if (this.email.trim() !== '' && this.password.trim() !== '') {
      // Realiza las validaciones adicionales
      if (this.emailValid && this.passwordValid) {
        // Intenta iniciar sesión
        if (this.loginService.iniciarSesion(this.email, this.password)) {
          // Las credenciales son válidas, redirige a la vista de menú
          this.router.navigateByUrl('/registro');
        } else {
          // Muestra una alerta si las credenciales no son válidas
          this.showAlert('Credenciales inválidas', 'Por favor, verifica tu correo y contraseña.');
        }
      } else {
        // Muestra una alerta si las credenciales no son válidas (excepto al registrarse)
        if (!registering) {
          this.showAlert('Credenciales inválidas', 'Por favor, verifica tu correo y contraseña.');
        }
      }
    } else {
      // Muestra una alerta si hay campos vacíos
      this.showAlert('Campos vacíos', 'Por favor, completa todos los campos.');
    }
  }  

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

