import { Component, inject } from '@angular/core';
import { SnowEffect } from '../../components/snow-effect/snow-effect';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { RouterLink } from '@angular/router';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api/api-service';

@Component({
  selector: 'app-log-in',
  imports: [SnowEffect, NukeButton, RouterLink, ParallaxDirective, ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  loginForm = new FormGroup({
    pseudo: new FormControl(),
    password: new FormControl(),
  });

  apiService = inject(ApiService);
  constructor() {}

  onSubmit() {
    console.log(this.loginForm.get('pseudo')?.value);
    this.apiService
      .post('log-in', { pseudo: this.loginForm.controls.pseudo.value })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
