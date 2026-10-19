import { Component, input, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoPipe } from '@jsverse/transloco';
import { CreatedMeme } from '../../models/meme';
import { NotificationService } from '../../services/notification/notification-service';

@Component({
  selector: 'app-meme-preview',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, TranslocoPipe],
  templateUrl: './meme-preview.html',
  styleUrl: './meme-preview.scss',
})
export class MemePreview {
  private notificationService = inject(NotificationService);

  createdMeme = input<CreatedMeme | null>(null);
  isLoading = input<boolean>(false);
  isDownloading = signal(false);

  async downloadMeme(): Promise<void> {
    const meme = this.createdMeme();
    if (!meme || this.isDownloading()) {
      return;
    }

    this.isDownloading.set(true);

    try {
      const response = await fetch(meme.url);
      if (!response.ok) {
        throw new Error(`Image download failed: ${response.status}`);
      }

      const image = await response.blob();
      const extension =
        {
          'image/jpeg': 'jpg',
          'image/png': 'png',
          'image/webp': 'webp',
        }[image.type] ?? 'jpg';
      const objectUrl = URL.createObjectURL(image);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `meme.${extension}`;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      this.notificationService.showSuccess('memeDownloaded');
    } catch {
      this.notificationService.showError('memeDownloadFailed');
    } finally {
      this.isDownloading.set(false);
    }
  }
}
