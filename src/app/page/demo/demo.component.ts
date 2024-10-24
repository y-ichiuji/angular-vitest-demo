import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostalService } from '../../service/postal.service';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  private readonly _postalService = inject(PostalService);
  postCode = model('');
  postAddress = signal('');

  onSearchAddress() {
    this._postalService.queryAddress(this.postCode()).subscribe({
      next: (address) => this.postAddress.set(address),
      error: (error) => this.postAddress.set(error.message),
    });
  }
}
