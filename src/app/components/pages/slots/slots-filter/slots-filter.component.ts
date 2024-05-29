import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'croco-slots-filter',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './slots-filter.component.html',
  styleUrl: './slots-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotsFilterComponent {
  categories = input<any[] | null>([]);
  providers = input<any[] | null>([]);
  selectedCategory = input<any | null>(undefined);
  selectedProvider = input<any | null>(undefined);

  selectCategory = output<any | null>();
  selectProvider = output<any | null>();
}
