import { Routes } from '@angular/router';

import { InitialPageComponent } from './initial-page/initial-page.component';
import { GamePageComponent } from './game-page/game-page.component';

export const appRoutes: Routes = [
  { path: '', component: InitialPageComponent, pathMatch: 'full' },
  {
    path: 'game',
    component: GamePageComponent,
    data: {
      hasSearchBar: true,
    },
  },
];
