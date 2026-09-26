import { Service, signal } from '@angular/core';
import { Meme } from '../models/meme';

@Service()
export class MemeState {
    private readonly _currentMeme = signal<Meme | null>(null);

    readonly currentMeme = this._currentMeme.asReadonly();

    setCurrentMeme(meme: Meme): void {
        this._currentMeme.set(meme);
    }

    public clear(): void {
        this._currentMeme.set(null);
    }
}
