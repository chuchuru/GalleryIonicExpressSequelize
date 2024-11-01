import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  selectedImage: File | null = null;
  imageError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      if (file) {
        this.selectedImage = file;
        this.imageError = null; // Reset error
      }
    }
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    
    const formData = new FormData();
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    if (this.selectedImage) {
      formData.append('file', this.selectedImage, this.selectedImage.name);
    }

    this.httpClient.post('http://localhost:8080/api/users/register', formData)
      .subscribe(
        response => {
          // Manejar la respuesta aquí
          console.log(response);
          this.router.navigate(['/login']);
        },
        error => {
          // Manejar errores aquí
          console.error(error);
        }
      );
  }
}
