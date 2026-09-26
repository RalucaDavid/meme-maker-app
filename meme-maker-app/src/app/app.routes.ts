import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { MemeState } from './signals/meme';

export const routes: Routes = [
    {
        path: 'meme-templates',
        loadComponent: () => import('./pages/memes/memes').then(m => m.MemesPage)
    },
    {
        path: 'meme-template-editor',
        loadComponent: () => import('./pages/meme-editor/meme-editor').then(m => m.MemeEditorPage),
        canDeactivate: [
            () => {
                inject(MemeState).clear();
                return true;
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'meme-templates',
        pathMatch: 'full'
    }
];
