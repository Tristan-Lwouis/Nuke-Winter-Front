import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { SnowEffect } from '../../components/snow-effect/snow-effect';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { ScenarioImportService } from '../../core/services/scenario-import-service/scenario-import-service';
// import { GameService }           from '../../core/services/game/game-service';

@Component({
  selector: 'app-scenario-import',
  imports: [SnowEffect, ParallaxDirective, NukeButton, JsonPipe],
  templateUrl: './scenario-import.html',
  styleUrl: './scenario-import.scss',
})
export class ScenarioImport {
  scenarioImportService = inject(ScenarioImportService);

  // ATTRIBUTS DU FICHIER
  file: File | null = null;
  jsonContent: any = null;
  importStatus: string = 'Waiting for import';
  importErrorDetail: string = '';
  cdr = inject(ChangeDetectorRef);

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          this.jsonContent = JSON.parse(e.target.result);
          console.log('Contenu JSON récupéré :', this.jsonContent);
          this.cdr.detectChanges();
        } catch (error) {
          console.error('Erreur lors de la lecture du fichier JSON', error);
          this.jsonContent = null;
        }
      };
      reader.readAsText(file);
    }
  }

  // Au clic sur le bouton import
  onImport() {
    console.log('Import scenario');
    // Verifier que le fichier est non null
    if (!this.file) {
      alert('Aucun fichier sélectionné');
      return;
    } else {
      console.log('Fichier sélectionné :', this.file.name);
      // TODO : Appel au service pour importer le scenario dans le back
      this.scenarioImportService.loadScenario(this.file).subscribe({
        next: (response: any) => {
          console.log('Scenario importé :', response);
        },
      });
    }
  }
}
