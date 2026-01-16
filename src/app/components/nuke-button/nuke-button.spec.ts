import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NukeButton } from './nuke-button';

describe('NukeButton', () => {
  let component: NukeButton;
  let fixture: ComponentFixture<NukeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NukeButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NukeButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
