import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Game } from '@schemas/slots-api.schema';

@Component({
  selector: 'croco-slot',
  standalone: true,
  imports: [],
  templateUrl: './slot.component.html',
  styleUrl: './slot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotComponent {
  slot = input.required<Game>();
}
