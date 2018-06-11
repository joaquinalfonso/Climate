import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AppComponent } from './app.component';
import { LocationComponent } from './components/location/location.component';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { ReplaceStrPipe } from './replace-char.pipe';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    LocationDetailComponent,
    MessagesComponent,
    ReplaceStrPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-ES' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
