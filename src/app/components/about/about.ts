import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../site-config';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly site = SITE;
}
