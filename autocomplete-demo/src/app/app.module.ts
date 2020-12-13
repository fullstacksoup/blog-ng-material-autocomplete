/********************************************************************************/
/*                   A N G U L A R   L I B R A R I E S                    */
/********************************************************************************/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/********************************************************************************/
/*         A N G U L A R   M A T E R I A L   L I B R A R I E S                  */
/********************************************************************************/

// Recommend Keeping Material Libraries separate to help reduce the module.ts file size
import { MaterialModule } from './material.module';

/********************************************************************************/
/*                A P P L I C A T I O N   S E R V I C E S                  */
/********************************************************************************/

import { GeoLocationService } from './services/geo-location.service';
import { SimpleAutocompleteFieldComponent } from './components/simple-autocomplete-field/simple-autocomplete-field.component';
import { JsonAutocompleteFieldComponent } from './components/json-autocomplete-field/json-autocomplete-field.component';

/********************************************************************************/
/*                A P P   C O M P O N E N T S                  */
/********************************************************************************/

@NgModule({
  declarations: [
    AppComponent,
    SimpleAutocompleteFieldComponent,
    JsonAutocompleteFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule

    // RECOMMEND:  Using another module.ts file like material.module.ts instead of adding the Material libraries in the root or feature modules
    // Just remember when adding new components you might have to use
    // ng g c component-name --module=app

  ],
  providers: [GeoLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
