import { Injectable, signal } from '@angular/core';
import { Game } from '@schemas/slots-api.schema';

@Injectable({
  providedIn: 'root'
})
export class SlotsStateService {
  slots = signal<Game[]>([]);

}
