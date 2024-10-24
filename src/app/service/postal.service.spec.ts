import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PostalService } from './postal.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('PostalService', () => {
  let service: PostalService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostalService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should query address', fakeAsync(() => {
    vi.spyOn(httpClient, 'get').mockReturnValueOnce(
      of({
        addresses: [
          {
            ja: {
              prefecture: '東京都',
              address1: '千代田区',
              address2: '',
              address3: '',
              address4: '',
            },
          },
        ],
      })
    );
    service.queryAddress('1000000').subscribe((address) => {
      expect(address).toBe('東京都千代田区');
    });

    tick();
    expect(httpClient.get).toHaveBeenCalledWith(
      'https://jp-postal-code-api.ttskch.com/api/v1/1000000.json'
    );
  }));

  it('should throw error when invalid post code', fakeAsync(() => {
    vi.spyOn(httpClient, 'get').mockReturnValueOnce(
      of({
        addresses: [
          {
            ja: {
              prefecture: '東京都',
              address1: '千代田区',
              address2: '',
              address3: '',
              address4: '',
            },
          },
        ],
      })
    );
    service.queryAddress('100000').subscribe({
      error: (err) => {
        expect(err.message).toBe('Invalid post code');
      },
    });

    tick();
    expect(httpClient.get).not.toHaveBeenCalled();
  }));
});
