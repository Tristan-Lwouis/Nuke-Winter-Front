import { Component, inject } from '@angular/core';
import { SnowEffect } from "../../components/snow-effect/snow-effect";
import { NukeButton } from "../../components/nuke-button/nuke-button";
import { Router, RouterLink } from '@angular/router';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { AccountService } from '../../core/services/account/account-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../core/services/storage/storage-service';
import { Account } from '../../core/models/account';

@Component({
  selector: 'app-register',
  imports: [SnowEffect, NukeButton, RouterLink, ReactiveFormsModule, ParallaxDirective],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  
  private loading = false;

  // pour lier et avoir la main sur les input de la vue coté logique
    authForm = new FormGroup({
    pseudo: new FormControl('', { nonNullable: true, validators: [Validators.required] }), // TODO: ajouter un validator pour autoriser que des caractere normaux
    //password: new FormControl(),
  });

  router = inject(Router);
  accountService = inject(AccountService);
  storageService = inject(StorageService);

  constructor() {}
  
  submitRegister() {
    this.loading = true;

    // on ne fait la requete que si le formualire est valid
    if (!this.authForm.valid) {
      this.loading = false;
      return;
    }

    // on confirme à l'utilisateur que son compte est créé
    this.accountService.register(this.authForm.controls.pseudo.value).subscribe({
      next: (account: Account) => {
        if (account) {
          alert("Création de compte réussie");
           this.router.navigate(['/log-in']);
        } else {
          // ajouter une erreur dans le authForm , pour l'invalider
          this.authForm.controls.pseudo.setErrors({ notFound: true });
        }
        this.loading = false;
      },
      error: (err) => console.error(err),
    });
  }
}