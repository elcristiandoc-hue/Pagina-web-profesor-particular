import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const FILLED_ICONS = new Set(['whatsapp']);

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(20);

  protected readonly filled = computed(() => FILLED_ICONS.has(this.name()));
}
