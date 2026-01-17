import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowEffect } from './snow-effect';

describe('SnowEffect', () => {
  let component: SnowEffect;
  let fixture: ComponentFixture<SnowEffect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnowEffect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnowEffect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
