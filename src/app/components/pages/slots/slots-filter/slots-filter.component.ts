import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { SlotsApiCategory, SlotsApiProvider } from '@schemas/slots-api.schema';
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
  categories = input<SlotsApiCategory[] | null>([]);
  providers = input<SlotsApiProvider[] | null>([]);
  selectedCategory = input<string | null>();
  selectedProvider = input<string | null>();

  selectCategory = output<SlotsApiCategory | null>();
  selectProvider = output<SlotsApiProvider | null>();
}
