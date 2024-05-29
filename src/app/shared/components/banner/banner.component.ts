import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'croco-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {

}
