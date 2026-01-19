import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage-service';

describe('StorageService', () => {
  let service: StorageService;

  const TEST_KEY = 'test_key';
  const TEST_VALUE = 'test_value';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('Service bien injecté', () => {
    expect(service).toBeTruthy();
  });

  it('Récupère un objet dans le localStorage', () => {
    localStorage.setItem(TEST_KEY, TEST_VALUE);

    const result = service.read(TEST_KEY);

    expect(result).toBe(TEST_VALUE);
  });

  it("Récupère null s'il ne trouve pas l'objet dans le localStroage", () => {
    const result = service.read(TEST_KEY);

    expect(result).toBeNull();
  });

  it('Sauvgarde un object dans le localStorage', () => {
    service.save(TEST_KEY, TEST_VALUE);

    expect(localStorage.getItem(TEST_KEY)).toBe(TEST_VALUE);
  });

  it('Supprime un object du localStroage', () => {
    localStorage.setItem(TEST_KEY, TEST_VALUE);

    service.delete(TEST_KEY);

    expect(localStorage.getItem(TEST_KEY)).toBeNull();
  });

  it('Supprime tous les objets du localStroage', () => {
    localStorage.setItem('a', '1');
    localStorage.setItem('b', '2');

    service.clear();

    expect(localStorage.length).toBe(0);
  });
});
