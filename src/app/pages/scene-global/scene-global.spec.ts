import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SceneGlobal } from './scene-global';


describe('SceneMulti', () => {
  let component: SceneGlobal;
  let fixture: ComponentFixture<SceneGlobal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneGlobal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneGlobal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
