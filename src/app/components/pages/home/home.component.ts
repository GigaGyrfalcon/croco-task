import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'croco-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor() {
    console.log('HomeComponent');
  }

}
