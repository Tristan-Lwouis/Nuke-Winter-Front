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
  folderName: string | null = null; // Nom du dossier racine
  manifestFile: File | null = null; // Fichier manifest.json
  jsonContent: any = null; // Contenu du fichier manifest.json

  file: File | null = null; // Fichier 'en cours'
  imageFiles: File[] = []; // Fichiers images
  importLogs: string[] = []; // Logs de l'import

  // Injection de dépendances
  cdr = inject(ChangeDetectorRef);

  addLog(message: string) {
    this.importLogs.push(message);
    this.cdr.detectChanges();
  }

  clearLogs() {
    this.importLogs = [];
    this.cdr.detectChanges();
  }

  //Fonction appelée lorsqu'un fichier est sélectionné
  onFileSelected(event: any) {
    this.clearLogs();
    const files: FileList = event.target.files;

    // Reset si on change de dossier
    this.manifestFile = null;
    this.imageFiles = [];
    this.folderName = null;
    this.jsonContent = null;
    this.file = null;

    // Vérification que le fichier est non null
    if (files.length > 0) {
      // On détermine le nom du dossier racine à partir du premier fichier
      const firstPath = files[0].webkitRelativePath;

      // Sécurité : s'assurer qu'il y a bien un dossier
      if (!firstPath || firstPath.indexOf('/') === -1) {
        this.addLog('Error: Sélectionnez un dossier, pas un fichier.');
        return;
      } else {
        // Si c'est un dossier, on récupère le nom du dossier racine dans folderName
        this.folderName = firstPath.split('/')[0];
      }

      // tri des fichiers selon la structure imposée
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = file.webkitRelativePath;

        // Le manifest doit être directement à la racine du dossier
        if (path === `${this.folderName}/manifest.json`) {
          this.manifestFile = file;
        }
        // Les images doivent être dans le sous-dossier "images"
        else if (path.startsWith(`${this.folderName}/images/`)) {
          this.imageFiles.push(file);
        }
      }

      // Traitement du manifest
      if (this.manifestFile) {
        this.file = this.manifestFile;

        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            this.jsonContent = JSON.parse(e.target.result);
            this.addLog('Manifest found');
            this.addLog('Image count : ' + this.imageFiles.length);
            for (let image of this.imageFiles) this.addLog('   - Image found : ' + image.name);
          } catch (error) {
            this.addLog('Error: Invalid manifest.json file');
            this.jsonContent = null;
          }
        };
        reader.readAsText(this.manifestFile);
      } else {
        this.addLog(`Error: No manifest.json found in the root directory '${this.folderName}'`);
      }
    }
  }

  // Au clic sur le bouton import
  onImport() {
    this.addLog('Importing scenario...');
    // Verifier que le fichier manifest est non null
    if (!this.jsonContent) {
      this.addLog('Error: No manifest found');
      return;
    } else {

      // ==== IMPORT MANIFEST ====
      this.scenarioImportService.loadScenario(this.jsonContent).subscribe({
        next: (response: any) => {
          this.addLog('Success: ✅ manifest imported successfully!');
        },
        error: (err: any) => {
          this.addLog('Error: ❌ Manifest import failed.');
        },
      });
    }

    // ==== IMPORT IMAGES ====
    this.scenarioImportService.loadImages(this.imageFiles).subscribe({
      next: (response: any) => {
        this.addLog('Success: ✅ images imported successfully!');
        //console.log(response);
        
      },
      error: (err: any) => {
        this.addLog('Error: ❌ Images import failed.');
      },
    });
  }
}
