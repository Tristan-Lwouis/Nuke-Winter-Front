import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioImport } from './scenario-import';

describe('ScenarioImport', () => {
  let component: ScenarioImport;
  let fixture: ComponentFixture<ScenarioImport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioImport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioImport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
