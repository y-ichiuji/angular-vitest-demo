import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostalService {
  private readonly _httpClient = inject(HttpClient);

  queryAddress(postCode: string) {
    if (postCode.length !== 7) {
      return throwError(() => new Error('Invalid post code'));
    }

    return this._httpClient
      .get(`https://jp-postal-code-api.ttskch.com/api/v1/${postCode}.json`)
      .pipe(
        map((res) => {
          const jaAddress = (res as any).addresses[0].ja;
          return `${jaAddress.prefecture}${jaAddress.address1}${jaAddress.address2}${jaAddress.address3}${jaAddress.address4}`;
        })
      );
  }
}
