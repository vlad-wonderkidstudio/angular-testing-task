import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CountriesFormComponent } from './countries-form/countries-form.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DateTimeInputComponent } from './date-time-input/date-time-input.component';
import { MultiSelectionDropdownComponent } from './multi-selection-dropdown/multi-selection-dropdown.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CountriesFormComponent,
    TopBarComponent,
    DateTimeInputComponent,
    MultiSelectionDropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: CountriesFormComponent },
    ], {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
