import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateMemeResponse, MemesResponse } from '../../dtos/meme';
import { MemeTextBox } from '../../models/meme';

@Service()
export class MemeServiceRepository {
    private http = inject(HttpClient);
    private baseUrl = `${environment.baseUrl}`;

    getAllMemes(): Observable<MemesResponse> {
        return this.http.get<MemesResponse>(`${this.baseUrl}/get_memes`);
    }

    createMeme(templateId: string, firstText: string, secondText: string): Observable<CreateMemeResponse> {
        const body = new HttpParams()
            .set('template_id', templateId)
            .set('text0', firstText)
            .set('text1', secondText);

        return this.http.post<CreateMemeResponse>(
            `${this.baseUrl}/caption_image`, 
            body,
        );
    }

    createMemeWithBoxes(templateId: string, boxes: MemeTextBox[]): Observable<CreateMemeResponse> {
        let body = new HttpParams()
            .set('template_id', templateId);

        boxes.forEach((box, index) => {
            Object.entries(box).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    body = body.set(`boxes[${index}][${key}]`, value.toString());
                }
            });
        });

        return this.http.post<CreateMemeResponse>(
            `${this.baseUrl}/caption_image`, 
            body,
        );
    }
}
