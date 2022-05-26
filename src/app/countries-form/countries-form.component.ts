import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ListItem, SaveData } from '../helpers/types'
import { CountriesService } from '../countries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries-form',
  templateUrl: './countries-form.component.html',
  styleUrls: ['./countries-form.component.scss']
})
export class CountriesFormComponent implements OnInit {
  countriesForm: FormGroup;
  allCountries: ListItem[] = [];

  dateFromValidators = [
    Validators.required,
    Validators.minLength(4),
    this.dateTimeValidator(),
    this.dateTimeRangeValidator()
  ];
  dateToValidators = [
    Validators.required,
    Validators.minLength(4),
    this.dateTimeValidator(),
    this.dateTimeRangeValidator()
  ];

  showSavedPopup:boolean = false;
  showCancelPopup:boolean = false;

  constructor( 
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
    private router: Router
  ) {
    this.countriesForm = this.formBuilder.group({
      dateTimeFrom: [this.formatDateTime(Date.now() - 24*60*60*1000), this.dateFromValidators],
      dateTimeTo: [this.formatDateTime(Date.now()), this.dateToValidators],
      dateTimeTo2: [this.formatDateTime(Date.now()), this.dateToValidators],
      countries: ['', Validators.required ],
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  };

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe( (res: ListItem[]) => {
      this.allCountries = res;
    });
  }
  get dateTimeFrom() { return this.countriesForm.get('dateTimeFrom'); }
  get dateTimeTo() { return this.countriesForm.get('dateTimeTo'); }
  get dateTimeTo2() { return this.countriesForm.get('dateTimeTo2'); }
  get countries() { return this.countriesForm.get('countries'); }

  get dateTimeFromErrorMessage(): string {
    return this.getAndProcessErrorMessage(this.dateTimeFrom, {
      required: 'This field is required',
      badDateTime: 'Date and time is incorrect',
      badRange: 'The FROM date should be earlier than the TO date',
    });
  }

  get dateTimeToErrorMessage(): string {
    return this.getAndProcessErrorMessage(this.dateTimeTo, {
      required: 'This field is required',
      badDateTime: 'Date and time is incorrect',
      badRange: 'The FROM date should be earlier than the TO date',
    });
  }

  get countriesErrorMessage(): string {
    return this.getAndProcessErrorMessage(this.countries, {
      required: 'This field is required',
    });
  }

  getAndProcessErrorMessage(formElement: AbstractControl | null, errorStrings: any): string {
    let errStr = '';
    if (formElement && formElement.invalid && formElement.errors) {
      let errors = formElement.errors;
      if(errors instanceof Array && errors.length) {
        errors = errors[0];
      }

      Object.keys(errorStrings).forEach( key => {
        if (errors[key]) {
          errStr = errorStrings[key];
        }
      });
    }
    return errStr;
  }

  formatDateTime(timestamp: number) {
    const timeDate = new Date(timestamp);
    timeDate.setMinutes(timeDate.getMinutes() - timeDate.getTimezoneOffset());
    return timeDate.toISOString().replace(/\.\d\d\dZ/, "")
  }

  save() {
    if (!this.dateTimeFrom || !this.dateTimeTo || !this.countries) { return; }
    const saveData: SaveData = {
      dateTimeFrom: this.dateTimeFrom.value,
      dateTimeTo: this.dateTimeTo.value,
      countriesIds: this.countries.value,
    };
    this.countriesService.saveCountries(saveData);
    this.openSavedPopup();
  }
  cancel() {
    this.openCancelPopup();
  }
  leaveTheForm() {
    // Do nothing so far
    this.closeCancelPopup();
    this.router.navigateByUrl('/');
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  dateTimeRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let badRange = false;
      if (this.countriesForm
        && this.dateTimeFrom
        && this.dateTimeTo
        && this.dateTimeFrom.value
        && this.dateTimeTo.value
      ) {
        const fromTime = Date.parse(this.dateTimeFrom.value);
        const toTime = Date.parse(this.dateTimeTo.value);
        if (fromTime >= toTime) {
          badRange = true;
        } else {
          // It is made for cases when the To time is set as invalid,
          // but we change From to earlier date then To, or wisa versa
          if (control == this.dateTimeFrom && this.dateTimeTo.invalid) {
            this.dateTimeTo.updateValueAndValidity();
          } else if (control == this.dateTimeTo && this.dateTimeFrom.invalid) {
            this.dateTimeFrom.updateValueAndValidity();
          }
        }
      }
      return badRange ? { badRange: true } : null;
    };
  }

  dateTimeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let badDateTime = false;
      if (control && control.value) {
        const time = Date.parse(control.value);
        if (isNaN(time) || (time < 0)){
          badDateTime = true;
        }
      }
      return badDateTime ? { badDateTime: true } : null;
    };
  }

  openSavedPopup() {
    this.showSavedPopup = true;
  }
  closeSavedPopup() {
    this.showSavedPopup = false;
  }
  openCancelPopup() {
    this.showCancelPopup = true;
  }
  closeCancelPopup() {
    this.showCancelPopup = false;
  }

}
