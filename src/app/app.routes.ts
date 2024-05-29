import { Routes } from '@angular/router';
import { HomeComponent } from '@components/pages/home/home.component';
import { NotFoundComponent } from '@components/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'casino', loadComponent: () => import('@components/pages/casino/casino.component').then(m => m.CasinoComponent)},
  { path: 'live', loadComponent: () => import('@components/pages/live/live.component').then(m => m.LiveComponent)},
  { path: 'slots', loadComponent: () => import('@components/pages/slots/slots.component').then(m => m.SlotsComponent)},
  { path: 'sport', loadComponent: () => import('@components/pages/sport/sport.component').then(m => m.SportComponent)},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
