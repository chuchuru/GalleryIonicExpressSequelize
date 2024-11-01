import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  onLogin() {
    this.userService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token); // Almacenar el token
        console.log(Token);
        this.router.navigate(['/home']); // Redirigir a la página de inicio
      },
      error => {
        alert('Error en las credenciales');
      }
    );
  }
}
