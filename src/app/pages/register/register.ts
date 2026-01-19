import { Component, inject } from '@angular/core';
import { SnowEffect } from '../../components/snow-effect/snow-effect';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { RouterLink } from '@angular/router';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../core/services/api/api-service';

@Component({
  selector: 'app-register',
  imports: [SnowEffect, NukeButton, RouterLink, ParallaxDirective],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
    registerForm = new FormGroup({
        pseudo: new FormControl(),
        password: new FormControl(),
    });

  apiService = inject(ApiService);
  constructor() {}

    onSubmit() {
    console.log(this.registerForm.get('pseudo')?.value);
    this.apiService
      .post('register', { pseudo: this.registerForm.controls.pseudo.value })
      .subscribe((data) => {
        console.log(data);
      });
  }
}