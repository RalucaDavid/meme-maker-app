import { Component } from '@angular/core';
import { MemeEditor } from '../../components/meme-editor/meme-editor';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-meme-editor-page',
  imports: [
    MemeEditor,
    TranslocoPipe 
  ],
  templateUrl: './meme-editor.html',
  styleUrl: './meme-editor.scss',
})
export class MemeEditorPage {}