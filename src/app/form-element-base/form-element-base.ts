import {Component, OnInit, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'app-form-element-base',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormElementBase),
      multi: true
    }
  ]
})

export class FormElementBase implements ControlValueAccessor {
  @Input() caption: string | undefined;
  @Input() errorMessage: string | undefined;
  @Input() isRequired: boolean | undefined;

  input: string = '';

  onChange: any = () => {}
  onTouch: any = () => {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(input: string) {
    this.input = input;
  }
}
