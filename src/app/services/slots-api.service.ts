import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import {
  SlotsApiCategoryResponse,
  SlotsApiProvidersResponse,
  SlotsApiSlotsResponse,
  SlotsApiAllSlotsResponse,
  SlotsApiCategory,
} from '@schemas/slots-api.schema';

@Injectable({
  providedIn: 'root',
})
export class SlotsApiService {
  private readonly http = inject(HttpClient);

  fetchCategories() {
    const apiPath = '/integrations/v2/slot/categories?include=games';
    return this.http.get<SlotsApiCategoryResponse>(apiPath).pipe(
      map((data) => data.data.filter(this.filterInvalidCategories)),
      catchError(this.handleError('Failed to load categories'))
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
    return true;
  }

  private handleError =
    (errorMessage: string) =>
    (error: unknown): Observable<never> => {
      console.error(`${errorMessage}:`, error);
      return of();
    };

  fetchProviders() {
    const apiPath =
      'https://cms.crocobet.com/integrations?type=slot&platform=desktop';

    return this.http.get<SlotsApiProvidersResponse>(apiPath).pipe(
      map((data) => data.data),
      catchError(this.handleError('Failed to load categories'))
    );
  }

  fetchSlots() {
    const apiPath =
      'https://cms.crocobet.com/integrations/v2/slot/providers?include=games';

    return this.http.get<SlotsApiAllSlotsResponse>(apiPath).pipe(
      map((data) => data.data),
      catchError(this.handleError('Failed to load categories'))
    );
  }

  fetchSlotsByProvider(provider: string) {
    const apiPath = `https://cms.crocobet.com/integrations/v2/slot/providers/${provider}`;

    return this.http.get<SlotsApiSlotsResponse>(apiPath).pipe(
      map((data) => data.data),
      catchError(this.handleError('Failed to load categories'))
    );
  }
}
