import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { catchError, concatMap, of } from 'rxjs';
import { SanitizeHtmlPipe } from '@shared/pipes/sanitize-html.pipe';
import { AsyncPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'croco-icon',
  standalone: true,
  imports: [SanitizeHtmlPipe, AsyncPipe],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  private readonly http = inject(HttpClient);

  svgPath = input.required<string>();

  svgContent$ = toObservable(this.svgPath).pipe(
    concatMap((svgPath) =>
      this.http.get(svgPath, { responseType: 'text' }).pipe(
        catchError((error) => {
          console.error('Error loading SVG', error);
          return of('');
        })
      )
    )
  );
}
