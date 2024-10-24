import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { DemoComponent } from './demo.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PostalService } from '../../service/postal.service';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;
  let postalService: PostalService;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [DemoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    postalService = TestBed.inject(PostalService);
    fixture.detectChanges();
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('render post code', fakeAsync(() => {
    component.postCode.set('1000000');
    fixture.detectChanges();
    tick();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')?.value).toBe('1000000');
  }));

  it('render post address', fakeAsync(() => {
    component.postAddress.set('東京都千代田区');
    fixture.detectChanges();
    tick();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[name="post_address"]')?.textContent).toBe(
      '東京都千代田区'
    );
  }));

  it('should search address', fakeAsync(() => {
    vi.spyOn(postalService, 'queryAddress').mockReturnValueOnce(
      of('東京都千代田区')
    );

    component.postCode.set('1000000');
    fixture.detectChanges();
    tick();

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('button')?.click();
    tick();

    expect(postalService.queryAddress).toHaveBeenCalledWith('1000000');
    expect(component.postCode()).toBe('1000000');
    expect(component.postAddress()).toBe('東京都千代田区');
  }));

  it('should handle error when search address', fakeAsync(() => {
    vi.spyOn(postalService, 'queryAddress').mockReturnValueOnce(
      throwError(() => new Error('Invalid post code'))
    );

    component.postCode.set('100000');
    fixture.detectChanges();
    tick();

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('button')?.click();
    tick();

    expect(postalService.queryAddress).toHaveBeenCalledWith('100000');
    expect(component.postCode()).toBe('100000');
    expect(component.postAddress()).toBe('Invalid post code');
  }));
});
