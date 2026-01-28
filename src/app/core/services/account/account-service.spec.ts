import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';


import { ApiService } from '../api/api-service';
import { AccountService } from './account-service';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountService,
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should register a user', () => {
    const pseudo = 'Tiny';
    const mockResponse = { success: true };

    service.register(pseudo).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('account/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ pseudo });

    req.flush(mockResponse);
  });

  it('should login a user', () => {
    const pseudo = 'Tiny';
    const mockResponse = { token: 'abc123' };

    service.login(pseudo).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('account/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ pseudo });

    req.flush(mockResponse);
  });

  it('should logout the user', () => {
    const mockResponse = { success: true };

    service.logout().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('account/logout');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should read account info', () => {
    const mockResponse = { pseudo: 'Tiny', score: 42 };

    service.read().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('account/read');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});