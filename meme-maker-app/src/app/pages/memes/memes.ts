import { Component, inject } from '@angular/core';
import { MemesList } from '../../components/memes-list/memes-list';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-memes',
  imports: [
    MemesList,
    TranslocoPipe 
  ],
  templateUrl: './memes.html',
  styleUrl: './memes.scss',
})
export class MemesPage {}