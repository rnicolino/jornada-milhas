import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router) {
    this.loginForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if(this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      // Implement login logic here, such as calling an authentication service
      this.authService.autenticar(email, password).subscribe({
        next: (value) => {
          // Handle successful authentication, e.g., store token, navigate to dashboard
          console.log('Login successful:', value),
          this.router.navigateByUrl('/'),
          this.loginForm.reset();
        },
        error: (err) => {
          // Handle authentication errors, e.g., show error message
          console.log('Login failed:', err);
        }
      });
    } else {
      // Handle form validation errors, e.g., show error messages
      console.log('Form is invalid');
    }
  }
}
