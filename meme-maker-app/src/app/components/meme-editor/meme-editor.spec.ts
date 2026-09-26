import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeEditor } from './meme-editor';

describe('MemeEditor', () => {
  let component: MemeEditor;
  let fixture: ComponentFixture<MemeEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemeEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(MemeEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
