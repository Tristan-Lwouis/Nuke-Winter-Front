import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneResolver } from './scene-resolver';

describe('SceneResolver', () => {
  let component: SceneResolver;
  let fixture: ComponentFixture<SceneResolver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneResolver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneResolver);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
