import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoPipe } from '@jsverse/transloco';
import { CreatedMeme } from '../../models/meme';

@Component({
  selector: 'app-meme-preview',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TranslocoPipe
  ],
  templateUrl: './meme-preview.html',
  styleUrl: './meme-preview.scss'
})
export class MemePreview {
  createdMeme = input<CreatedMeme | null>(null);
  isLoading = input<boolean>(false);
}