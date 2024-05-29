import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml',
  standalone: true,
})
export class SanitizeHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string | null): SafeHtml {
    if (!value) {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(value) || '';
  }
}
