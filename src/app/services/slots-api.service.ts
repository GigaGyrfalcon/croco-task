import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, filter, map, of } from 'rxjs';
import {
  SlotsApiCategoryResponse,
  SlotsApiProvidersResponse,
  SlotsApiSlotsResponse,
  SlotsApiAllSlotsResponse,
  SlotsApiCategory,
} from '@schemas/slots-api.schema';

interface LoadingState {
  slots: boolean;
  categories: boolean;
  providers: boolean;
}

interface ErrorState {
  slots: string | null;
  categories: string | null;
  providers: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class SlotsApiService {
  loading = signal<LoadingState>({
    slots: false,
    categories: false,
    providers: false,
  });

  error = signal<ErrorState>({
    slots: null,
    categories: null,
    providers: null,
  });

  private readonly http = inject(HttpClient);

  fetchCategories() {
    const apiPath = '/integrations/v2/slot/categories?include=games';
    return this.http.get<SlotsApiCategoryResponse>(apiPath).pipe(
      map((data) => data.data.filter(this.filterInvalidCategories)),
      catchError(this.handleError('categories', 'Failed to load categories'))
    );
  }

  private filterInvalidCategories(category: SlotsApiCategory) {
    // Ignore mobile categories
    if (category.platform === 'mobile') {
      return false;
    }
    // Ignore categories without games
    if (category.games.length === 0) {
      return false;
    }
    // Ignore categories without icon
    if (!category.icon) {
      return false;
    }
    // Ignore categories without name
    if (!category.multiLangName?.en) {
      return false;
    }
    return true
  }

  // private handleCategoryResponse(data: SlotsApiCategoryResponse) {
  //   if (isDevMode()) {
  //     const parsedData = slotsApiCategoryResponseSchema.safeParse(data);
  //     if (!parsedData.success) {
  //       this.setError('categories', 'Data parsing failed');
  //     }
  //   }
  //   return this.processCategories(data.data);
  // }

  // private processCategories(categories: SlotsApiCategory[]) {
  //   if (Array.isArray(categories)) {
  //     return categories;
  //   }
  //   // this.setError('categories', 'Data is not an array of categories');
  //   return [];
  // }

  private setLoading(key: keyof LoadingState, value: boolean) {
    this.loading.set({ ...this.loading(), [key]: value });
  }

  private setError(key: keyof ErrorState, value: string | null) {
    this.error.set({ ...this.error(), [key]: value });
  }

  private handleError(key: keyof LoadingState, errorMessage: string) {
    return (error: unknown): Observable<never> => {
      console.error(`${errorMessage}:`, error);
      this.setError(key, `${errorMessage}: ${JSON.stringify(error, null, 2)}`);
      this.setLoading(key, false);
      return of();
    };
  }

  fetchProviders() {
    const apiPath =
      'https://cms.crocobet.com/integrations?type=slot&platform=desktop';

    return this.http.get<SlotsApiProvidersResponse>(apiPath).pipe(
      map((data) => data.data),
      catchError(this.handleError('categories', 'Failed to load categories'))
    );
  }

  fetchSlots() {
    const apiPath = 'https://cms.crocobet.com/integrations/v2/slot/providers?include=games';

    return this.http.get<SlotsApiAllSlotsResponse>(apiPath).pipe(
      map((data) => data.data),
      catchError(this.handleError('categories', 'Failed to load categories'))
    );
  }

  fetchSlotsByProvider(provider: string) {
    console.log('fetchSlots', provider);
    const apiPath = `https://cms.crocobet.com/integrations/v2/slot/providers/${provider}`;

    return this.http.get<SlotsApiSlotsResponse>(apiPath).pipe(
      map((data) => data.data),
      catchError(this.handleError('categories', 'Failed to load categories'))
    );
  }
}
