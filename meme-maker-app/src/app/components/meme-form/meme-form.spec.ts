import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeForm } from './meme-form';

describe('MemeForm', () => {
  let component: MemeForm;
  let fixture: ComponentFixture<MemeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MemeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
