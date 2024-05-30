import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'croco-live',
  standalone: true,
  imports: [],
  templateUrl: './live.component.html',
  styleUrl: './live.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveComponent {
}
