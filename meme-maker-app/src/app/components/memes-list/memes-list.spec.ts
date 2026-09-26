import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemesList } from './memes-list';

describe('MemesList', () => {
  let component: MemesList;
  let fixture: ComponentFixture<MemesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemesList],
    }).compileComponents();

    fixture = TestBed.createComponent(MemesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
