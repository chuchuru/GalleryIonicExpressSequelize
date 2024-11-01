import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isAboutOpen = false; // Variable para controlar el estado del menú desplegable

  constructor(private router: Router) {}

  toggleAbout() {
    this.isAboutOpen = !this.isAboutOpen; // Alternar estado del menú desplegable
  }

  signOut() {
    // Redirigir a la pantalla de registro
    this.router.navigate(['/register']);
  }
}
