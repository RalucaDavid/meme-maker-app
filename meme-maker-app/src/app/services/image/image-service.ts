import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatedMeme } from '../../models/meme';

@Service()
export class ImageService {
  preloadImageFromCreatedMeme(meme: CreatedMeme): Observable<any> {
    return new Observable((observer) => {
      if (!meme || !meme.url) {
        observer.next(meme);
        observer.complete();
        return;
      }

      const img = new Image();
      img.src = meme.url;
      img.onload = () => {
        observer.next(meme);
        observer.complete();
      };
      img.onerror = () => {
        observer.next(meme);
        observer.complete();
      };
    });
  }
}
