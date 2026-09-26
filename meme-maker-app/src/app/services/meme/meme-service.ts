import { inject, Service } from '@angular/core';
import { MemeServiceRepository } from './meme-service-repository';
import { CreatedMeme, Meme, MemeTextBox } from '../../models/meme';
import { catchError, map, Observable, of } from 'rxjs';
import { CreateMemeResponse } from '../../dtos/meme';
import { NotificationService } from '../notification-service';

@Service()
export class MemeService {
    private memeServiceRepository = inject(MemeServiceRepository);
    private notificationService = inject(NotificationService);

    getAllMemes(): Observable<Meme[]>  {
        return this.memeServiceRepository.getAllMemes().pipe(
            map((response) => {
                return response.data.memes;
            }),
            catchError(error => {
                this.notificationService.showError('errorOccured');
                console.error('An error has occurred:', error);
                return of([]);
            })
        );
    }

    createMeme(templateId: string, firstText: string, secondText: string): Observable<CreatedMeme | null> {
        return this.memeServiceRepository.createMeme(templateId, firstText, secondText).pipe(
            this.handleMemeResponse()
        );
    }

    createMemeWithBoxes(templateId: string, boxes: MemeTextBox[]): Observable<CreatedMeme | null> {
        return this.memeServiceRepository.createMemeWithBoxes(templateId, boxes).pipe(
            this.handleMemeResponse()
        );
    }

    private handleMemeResponse() {
        return (source$: Observable<CreateMemeResponse>): Observable<CreatedMeme | null> =>
            source$.pipe(
                map((response: CreateMemeResponse) => {
                    if (!response.success || !response.data) {
                        throw new Error(response.error_message || 'An error occurred while creating the meme.');
                    }
                    return {
                        url: response.data.url,
                        page_url: response.data.page_url
                    };
                }),
                catchError((error) => {
                    this.notificationService.showError('errorOccured');
                    console.error('An error has occurred:', error);
                    return of(null);
                })
            );
    }
}
