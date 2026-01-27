import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { SnowEffect } from '../../components/snow-effect/snow-effect';
import { AccountService } from '../../core/services/account/account-service';
import { finalize } from 'rxjs';
import { StorageService } from '../../core/services/storage/storage-service';
import { AudioService } from '../../core/services/audio/audio-service';
import { Account } from '../../core/models/account';

@Component({
  selector: 'app-menu',
  imports: [ParallaxDirective, NukeButton, SnowEffect],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {

  audioService = inject(AudioService);
  storageService = inject(StorageService);
  connectedAccount: Account | undefined;
  router = inject(Router);
  accountService = inject(AccountService);
  
  ngOnInit(): void {
    // this.accountService.getProfile().subscribe();
    this.audioService.playBackground(this.audioService.mainMusicPath);
    const account = this.storageService.read('account');
    if (account) {
      this.connectedAccount = JSON.parse(account);
      // console.log('Account:', this.connectedAccount);
    }
  }

  onClickLogout() {
    this.accountService
      .logout()
      .pipe(
        finalize(() => {
          // on logout quoi qu'il arrive
          this.storageService.clear();
          this.router.navigate(['/']);
        }),
      )
      .subscribe();
  }
}
