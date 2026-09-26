import { Component, inject, input } from '@angular/core';
import { Meme as MemeType } from '../../models/meme';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { MemeState } from '../../signals/meme';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-meme',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    TranslocoPipe 
  ],
  templateUrl: './meme.html',
  styleUrl: './meme.scss',
})
export class Meme {
  private router = inject(Router);
  public memeState = inject(MemeState);

  memeData = input.required<MemeType>(); 

  onSelect() {
    this.memeState.setCurrentMeme(this.memeData());
    this.router.navigate(['/meme-template-editor']);
  }
}
