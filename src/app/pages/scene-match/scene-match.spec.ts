import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneMatch } from './scene-match';

describe('SceneMatch', () => {
  let component: SceneMatch;
  let fixture: ComponentFixture<SceneMatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneMatch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneMatch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
