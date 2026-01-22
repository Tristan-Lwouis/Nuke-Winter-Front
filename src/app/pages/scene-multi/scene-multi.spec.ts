import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SceneMulti } from './scene-multi';


describe('SceneMulti', () => {
  let component: SceneMulti;
  let fixture: ComponentFixture<SceneMulti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneMulti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneMulti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
