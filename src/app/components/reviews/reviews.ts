import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../site-config';

@Component({
  selector: 'app-reviews',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews {
  protected readonly site = SITE;
}
