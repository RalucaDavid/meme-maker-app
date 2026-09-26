import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Memes } from './memes';

describe('Memes', () => {
  let component: Memes;
  let fixture: ComponentFixture<Memes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Memes],
    }).compileComponents();

    fixture = TestBed.createComponent(Memes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
