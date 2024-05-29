import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { SlotsFilterComponent } from '@components/pages/slots/slots-filter/slots-filter.component';
import {
  Game,
  SlotsApiCategory,
  SlotsApiProvider,
} from '@schemas/slots-api.schema';
import { SlotsApiService } from '@services/slots-api.service';
import {
  Observable,
  combineLatest,
  switchMap,
  of,
  map,
  shareReplay,
  Subscription,
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
  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  selectedCategory = signal<string | null>(null);
  selectedProvider = signal<string | null>(null);

  queryParamsSetSubscription: Subscription | null = null;

  categories$ = this.slotsApiService.fetchCategories().pipe(shareReplay(1));
  providers$ = this.slotsApiService.fetchProviders().pipe(shareReplay(1));

  queryParamsSet$ = this.activatedRoute.queryParamMap.pipe(
    map((params) => [params.get('category'), params.get('provider')])
  )

  slots$: Observable<Game[]> = combineLatest([
    this.categories$,
    this.providers$,
    this.queryParamsSet$
  ]).pipe(
    map(([categories, providers, [category, provider]]) => {
      const selectedCategory =
        categories.find((c) => c.category === category) ?? null;
      const selectedProvider =
        providers.find((p) => p.provider === provider) ?? null;

      return [selectedCategory, selectedProvider];
    }),
    switchMap(([selectedCategory, selectedProvider]) => {
      if (selectedCategory) {
        return of(selectedCategory.games);
      }
      if (!selectedCategory && selectedProvider && selectedProvider.provider) {
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
    }),
    map((games) => games.slice(0, 30))
  );

  ngOnInit() {
    this.queryParamsSetSubscription = this.queryParamsSet$.subscribe(([category, provider]) => {
      this.selectedCategory.set(category);
      this.selectedProvider.set(provider);
    });
  }

  selectCategory(category: SlotsApiCategory | null) {
    if (!category) {
      this.router.navigate([]);
      return;
    }
    this.router.navigate([], { queryParams: { category: category.category } });
  }

  selectAllProviders() {
    this.router.navigate([]);
  }

  selectProvider(provider: SlotsApiProvider | null) {
    if (!provider) {
      this.router.navigate([]);
      return;
    }
    this.router.navigate([], { queryParams: { provider: provider.provider } });
  }

  ngOnDestroy() {
    this.queryParamsSetSubscription?.unsubscribe();
  }

}
