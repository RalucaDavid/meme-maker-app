import { Component, computed, inject, signal } from '@angular/core';
import { MemeService } from '../../services/meme/meme-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meme } from '../meme/meme';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoPipe } from '@jsverse/transloco';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SearchField } from '../search-field/search-field';

@Component({
  selector: 'app-memes-list',
  imports: [
    Meme,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    TranslocoPipe,
    SearchField,
  ],
  templateUrl: './memes-list.html',
  styleUrl: './memes-list.scss',
})
export class MemesList {
  private memeService = inject(MemeService);

  allMemes = toSignal(this.memeService.getAllMemes(), { initialValue: [] });

  searchTerm = signal('');
  pageIndex = signal(0);
  pageSize = signal(8);

  filteredMemes = computed(() => {
    const searchTerm = this.searchTerm().trim().toLocaleLowerCase();
    return this.allMemes().filter((meme) => meme.name.toLocaleLowerCase().includes(searchTerm));
  });

  displayedMemes = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.filteredMemes().slice(startIndex, endIndex);
  });

  onSearch(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
    this.pageIndex.set(0);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
