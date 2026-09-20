import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../site-config';

@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
