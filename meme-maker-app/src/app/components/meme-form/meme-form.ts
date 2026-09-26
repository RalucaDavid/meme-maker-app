import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoPipe } from '@jsverse/transloco';
import { Meme, MemeFormPayload } from '../../models/meme';

@Component({
  selector: 'app-meme-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    TranslocoPipe
  ],
  templateUrl: './meme-form.html',
  styleUrl: './meme-form.scss'
})
export class MemeForm {
  currentMeme = input.required<Meme>();
  isLoading = input<boolean>(false);
  submitForm = output<MemeFormPayload>();

  selectedTabIndex = signal<number>(0);

  private formBuilder = inject(FormBuilder);

  memeForm = this.formBuilder.group({
    firstText: ['', Validators.required],
    secondText: ['', Validators.required],
    boxes: this.formBuilder.array<string>([])
  });

  get boxesArray(): FormArray {
    return this.memeForm.get('boxes') as FormArray;
  }

  constructor() {
    effect(() => {
      const meme = this.currentMeme();
      this.buildFormBoxes(meme.box_count);
    });
  }

  private buildFormBoxes(count: number): void {
    this.boxesArray.clear();
    for (let i = 0; i < count; i++) {
      const boxGroup = this.formBuilder.group({
        text: ['', Validators.required],
        color: ['#ffffff'],
        outline_color: ['#000000']
      });
      this.boxesArray.push(boxGroup);
    }
  }

  onSubmit(): void {
    const isSimpleTab = this.selectedTabIndex() === 0;

    if (isSimpleTab) {
      const firstControl = this.memeForm.get('firstText');
      const secondControl = this.memeForm.get('secondText');

      if (firstControl?.invalid || secondControl?.invalid) {
        firstControl?.markAsTouched();
        secondControl?.markAsTouched();
        return;
      }

      const { firstText, secondText } = this.memeForm.getRawValue();

      this.submitForm.emit({
        mode: 'simple',
        firstText: (firstText || '').toUpperCase(),
        secondText: (secondText || '').toUpperCase()
      });

    } else {
      if (this.boxesArray.invalid) {
        this.boxesArray.markAllAsTouched();
        return;
      }

      const rawBoxes = this.boxesArray.getRawValue();

      this.submitForm.emit({
        mode: 'advanced',
        boxes: rawBoxes.map((box) => ({
          text: box.text.toUpperCase(),
          color: box.color,
          outline_color: box.outline_color
        }))
      });
    }
  }
}