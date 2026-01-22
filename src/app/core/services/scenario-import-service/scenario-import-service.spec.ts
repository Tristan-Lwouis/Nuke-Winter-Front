import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioImportService } from './scenario-import-service';

describe('ScenarioImportService', () => {
  let component: ScenarioImportService;
  let fixture: ComponentFixture<ScenarioImportService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioImportService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioImportService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
