import { Component, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-field',
  imports: [MatIconModule, TranslocoPipe],
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss',
})
export class SearchField {
  value = input('');
  valueChange = output<string>();

  onInput(event: Event): void {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }

  clear(): void {
    this.valueChange.emit('');
  }
}
