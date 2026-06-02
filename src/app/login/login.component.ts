import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user/user.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public isPasswordShown: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public login(): void {
    this.isLoading = true;
    const credentials = this.form.value;
    this.authService.login(credentials).subscribe({
      next: (authResponse) => {
        sessionStorage.setItem('token', authResponse.token);

        const userId = environment.userId;
        this.userService.find(userId).subscribe({
          next: (userRequestResponse) => {
            console.log('user response', userRequestResponse);
            const user = { id: userRequestResponse.data.id, ...userRequestResponse.data.data };
            sessionStorage.setItem('user', JSON.stringify(user));
            //this.isLoading = false;
            this.toastService.success(`Welcome ${user.name}`);
            this.router.navigate(['/home']);
          },
          error: (userRequestError) => {
            console.log('user request error: ', userRequestError);
            this.isLoading = false;
            this.toastService.error('Oh no, your user is currently deactivated');
          },
        });
      },
      error: (authError) => {
        console.log('auth request error: ', authError);
        this.isLoading = false;
        this.toastService.error('Incorrect email or password');
      },
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
