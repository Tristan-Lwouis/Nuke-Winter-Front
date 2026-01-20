import { Component, inject } from '@angular/core';
import { SnowEffect } from '../../components/snow-effect/snow-effect';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { Router } from '@angular/router';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../core/services/account/account-service';
import { StorageService } from '../../core/services/storage/storage-service';
import { Account } from '../../core/models/account';

@Component({
  selector: 'app-log-in',
  imports: [SnowEffect, NukeButton, ParallaxDirective, ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  private loading = false;

  // pour lier et avoir la main sur les input de la vue coté logique
  authForm = new FormGroup({
    pseudo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),// TODO: ajouter un validator pour autoriser que des caractere normaux
    //password: new FormControl(),
  });

  router = inject(Router);
  accountService = inject(AccountService);
  storageService = inject(StorageService);

  constructor() {}

  submitLogin() {
    this.loading = true;

    // on ne fait la requete que si le formualire est valid
    if (!this.authForm.valid) {
      this.loading = false;
      return;
    }

    // on stock l'account trouvé ou on affiche l'erreur
    this.accountService.login(this.authForm.controls.pseudo.value).subscribe({
      next: (account: Account) => {
        if (account) {
          this.storageService.save('account', JSON.stringify(account));
          this.router.navigate(['/menu']);
        } else {
          // ajouter une errur dans le authForm , pour l'invalider
          this.authForm.controls.pseudo.setErrors({ notFound: true });
        }
        this.loading = false;
      },
      error: (err) => console.error(err),
    });

  }

}
