import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../icon/icon';
import { SITE } from '../../site-config';

@Component({
  selector: 'app-subjects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './subjects.html',
  styleUrl: './subjects.css',
})
export class Subjects {
  protected readonly site = SITE;
}
