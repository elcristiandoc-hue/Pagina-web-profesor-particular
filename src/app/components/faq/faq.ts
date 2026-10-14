import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../site-config';

@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  protected readonly site = SITE;
}
