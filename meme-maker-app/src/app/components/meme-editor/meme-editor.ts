import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MemeService } from '../../services/meme/meme-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, filter, of, tap } from 'rxjs';
import { MemeState } from '../../signals/meme';
import { MemeFormPayload, MemeSubmission } from '../../models/meme';
import { TranslocoPipe } from '@jsverse/transloco';
import { ImageService } from '../../services/image/image-service';
import { MemeForm } from '../meme-form/meme-form';
import { MemePreview } from '../meme-preview/meme-preview';

@Component({
  selector: 'app-meme-editor',
  standalone: true,
  imports: [MatCardModule, MatIconModule, TranslocoPipe, MemeForm, MemePreview],
  templateUrl: './meme-editor.html',
  styleUrl: './meme-editor.scss',
})
export class MemeEditor {
  private memeService = inject(MemeService);
  private imageService = inject(ImageService);
  public memeState = inject(MemeState);

  private submissionData = signal<MemeSubmission | null>(null);
  public isLoading = signal<boolean>(false);

  createdMeme = toSignal(
    toObservable(this.submissionData).pipe(
      filter((data): data is MemeSubmission => data !== null),
      switchMap((submission) => {
        const request$ =
          submission.mode === 'simple'
            ? this.memeService.createMeme(
                submission.templateId,
                submission.firstText!,
                submission.secondText!,
              )
            : this.memeService.createMemeWithBoxes(submission.templateId, submission.boxes!);

        return request$.pipe(
          switchMap((meme) => {
            if (!meme) {
              return of(null);
            }
            return this.imageService.preloadImageFromCreatedMeme(meme);
          }),
          tap(() => this.isLoading.set(false)),
        );
      }),
    ),
    { initialValue: null },
  );

  onFormSubmit(formData: MemeFormPayload): void {
    const currentMeme = this.memeState.currentMeme();

    if (!currentMeme) {
      return;
    }

    this.isLoading.set(true);

    this.submissionData.set({
      templateId: currentMeme.id,
      ...formData,
    });
  }
}
