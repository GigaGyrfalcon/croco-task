import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'croco-casino',
  standalone: true,
  imports: [],
  templateUrl: './casino.component.html',
  styleUrl: './casino.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasinoComponent {
  constructor() {
    console.log('CasinoComponent');
  }

}
