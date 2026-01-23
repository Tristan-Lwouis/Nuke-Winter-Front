import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseMulti } from './response-multi';

describe('ResponseMulti', () => {
  let component: ResponseMulti;
  let fixture: ComponentFixture<ResponseMulti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseMulti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseMulti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
