import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-change-language',
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatSelectModule,
  ],
  templateUrl: './change-language.html',
  styleUrl: './change-language.scss',
})
export class ChangeLanguage {
  private translocoService = inject(TranslocoService);
  
  languages = [
    { code: 'ro', name: 'Romana' },
    { code: 'en', name: 'English' }
  ];

  onLanguageChange(langCode: string) {
    this.translocoService.setActiveLang(langCode);
  }
}