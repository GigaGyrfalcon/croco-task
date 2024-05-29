import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { SlotsFilterComponent } from '@components/pages/slots/slots-filter/slots-filter.component';
import {
  Game,
  SlotsApiCategory,
  SlotsApiProvider,
} from '@schemas/slots-api.schema';
import { toObservable } from '@angular/core/rxjs-interop';
import { SlotsApiService } from '@services/slots-api.service';
import {
  Subscription,
  Observable,
  combineLatest,
  switchMap,
  of,
  map,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'croco-slots',
  standalone: true,
  imports: [BannerComponent, RouterModule, SlotsFilterComponent, AsyncPipe],
  templateUrl: './slots.component.html',
  styleUrl: './slots.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotsComponent {
  slotsApiService = inject(SlotsApiService);

  selectedCategory = signal<SlotsApiCategory | null>(null);
  selectedProvider = signal<SlotsApiProvider | null>(null);

  subscriptions: Subscription[] = [];

  categories$ = this.slotsApiService.fetchCategories();
  providers$ = this.slotsApiService.fetchProviders();
  slots$: Observable<Game[]> = combineLatest([
    toObservable(this.selectedCategory),
    toObservable(this.selectedProvider),
  ]).pipe(
    switchMap(([selectedCategory, selectedProvider]) => {
      if (selectedCategory) {
        return of(selectedCategory.games);
      }

      if (!selectedCategory && selectedProvider) {
        return this.slotsApiService
          .fetchSlotsByProvider(selectedProvider.provider)
          .pipe(map((provider) => provider.games));
      }

      if (!selectedCategory && !selectedProvider) {
        return this.slotsApiService
          .fetchSlots()
          .pipe(map((slots) => slots.flatMap((slot) => slot.games)));
      }

      return of([]);
    })
  );

  ngOnInit() {
    this.subscriptions.push(
      this.categories$.subscribe((categories) => {
        this.selectedCategory.set(categories[0]);
      })
    );
  }

  selectCategory(category: SlotsApiCategory) {
    this.selectedCategory.set(category);
    this.selectedProvider.set(null);
  }

  selectAllProviders() {
    this.selectedProvider.set(null);
    this.selectedCategory.set(null);
  }

  selectProvider(provider: SlotsApiProvider) {
    this.selectedProvider.set(provider);
    this.selectedCategory.set(null);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
