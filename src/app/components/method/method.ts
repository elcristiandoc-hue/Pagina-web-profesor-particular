import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../site-config';

@Component({
  selector: 'app-method',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './method.html',
  styleUrl: './method.css',
})
export class Method {
  protected readonly site = SITE;
}
