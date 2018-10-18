import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { cardMatchReducer } from './store/reducer';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { appRoutes } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { GamePageComponent } from './game-page/game-page.component';
import { GameEffects } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    InitialPageComponent,
    HeaderComponent,
    GamePageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ cardMatching: cardMatchReducer }),
    EffectsModule.forRoot([GameEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ReactiveFormsModule],
})
export class AppModule {}
