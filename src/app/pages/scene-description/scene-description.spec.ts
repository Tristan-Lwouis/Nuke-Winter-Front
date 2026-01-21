import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneDescription } from './scene-description';

describe('SceneDescription', () => {
  let component: SceneDescription;
  let fixture: ComponentFixture<SceneDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneDescription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
