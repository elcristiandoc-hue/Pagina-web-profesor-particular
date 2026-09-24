import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../icon/icon';
import { SITE } from '../../site-config';

@Component({
  selector: 'app-online',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './online.html',
  styleUrl: './online.css',
})
export class Online {
  protected readonly site = SITE;
}
