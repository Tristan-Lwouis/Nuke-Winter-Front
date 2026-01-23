import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseMatch } from './response-match';

describe('ResponseMatch', () => {
  let component: ResponseMatch;
  let fixture: ComponentFixture<ResponseMatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseMatch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseMatch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
