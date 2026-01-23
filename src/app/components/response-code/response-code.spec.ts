import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseCode } from './response-code';

describe('ResponseCode', () => {
  let component: ResponseCode;
  let fixture: ComponentFixture<ResponseCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseCode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
