import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { MatError, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [MatError, MatLabel],
  template: `
    @if (control().invalid() && control().touched()) {
      @for (item of control().errors(); track item) {
        <mat-error>{{ item.message }}</mat-error>
      }
      @if (control().pending()) {
        <mat-label>checking...</mat-label>
      }
    }
  `,
  styles: [`
    .error-message {
      color: var(--mat-sys-error);
      font-size: 12px;
      margin-top: 4px;
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({ required: true }) control: FieldTree<unknown, string | number> | any = null;
}
