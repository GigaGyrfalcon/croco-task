import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'croco-sport',
  standalone: true,
  imports: [],
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportComponent {
  constructor() {
    console.log('SportComponent');
  }
}
