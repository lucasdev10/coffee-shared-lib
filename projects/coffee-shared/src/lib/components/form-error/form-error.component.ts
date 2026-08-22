import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { MatError, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [MatError, MatLabel],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({ required: true }) control: FieldTree<unknown, string | number> | any = null;
}
