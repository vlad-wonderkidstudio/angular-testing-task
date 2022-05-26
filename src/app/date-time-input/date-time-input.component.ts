import { Component, Injector, OnInit } from '@angular/core';
import {NG_VALUE_ACCESSOR, FormBuilder, ControlValueAccessor, FormGroup } from '@angular/forms';
import {FormElementBase} from '../form-element-base/form-element-base';

@Component({
  selector: 'app-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: DateTimeInputComponent, multi: true
  }]
})

export class DateTimeInputComponent extends FormElementBase {

}
