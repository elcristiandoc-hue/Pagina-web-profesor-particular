import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../icon/icon';
import { SITE } from '../../site-config';

@Component({
  selector: 'app-whatsapp-fab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './whatsapp-fab.html',
  styleUrl: './whatsapp-fab.css',
})
export class WhatsappFab {
  protected readonly site = SITE;
}
