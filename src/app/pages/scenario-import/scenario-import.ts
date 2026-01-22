import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { SnowEffect } from '../../components/snow-effect/snow-effect';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { ScenarioImportService } from '../../core/services/scenario-import-service/scenario-import-service';

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
  folderName: string | null = null;
  jsonContent: any = null;
  importStatus: string = 'Waiting for import';
  importErrorDetail: string = '';
  cdr = inject(ChangeDetectorRef);

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    if (files.length > 0) {
      // Extraction du nom du dossier à partir du premier fichier
      const firstFile = files[0];
      if (firstFile.webkitRelativePath) {
        this.folderName = firstFile.webkitRelativePath.split('/')[0];
      }

      let manifestFile: File | undefined = undefined;

      // Recherche du fichier manifest.json
      for (let i = 0; i < files.length; i++) {
        if (files[i].name.toLowerCase() === 'manifest.json') {
          manifestFile = files[i];
          break;
        }
      }

      if (manifestFile) {
        this.file = manifestFile;

        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            this.jsonContent = JSON.parse(e.target.result);
            console.log('Contenu JSON récupéré :', this.jsonContent);
            this.importStatus = 'Manifest found';
            this.importErrorDetail = '';
            this.cdr.detectChanges();
          } catch (error) {
            console.error('Erreur lors de la lecture du fichier JSON', error);
            this.jsonContent = null;
            this.importStatus = 'Error';
            this.importErrorDetail = 'Invalid manifest.json file';
            this.cdr.detectChanges();
          }
        };
        reader.readAsText(manifestFile);
      } else {
        console.warn('Aucun fichier manifest.json trouvé dans le dossier.');
        this.file = null;
        this.jsonContent = null;
        this.importStatus = 'Error';
        this.importErrorDetail = 'No manifest.json found in directory';
        this.cdr.detectChanges();
      }
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
