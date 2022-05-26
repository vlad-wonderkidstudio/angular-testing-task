import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef, Renderer2 } from '@angular/core';
import {NG_VALUE_ACCESSOR, FormBuilder, ControlValueAccessor, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import {FormElementBase} from '../form-element-base/form-element-base';
import {ListItem} from '../helpers/types'

@Component({
  selector: 'app-multi-selection-dropdown',
  templateUrl: './multi-selection-dropdown.component.html',
  styleUrls: ['./multi-selection-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: MultiSelectionDropdownComponent, multi: true
  }]
})

export class MultiSelectionDropdownComponent extends FormElementBase {
  @Input() items: ListItem[] | undefined;
  @Input() placeholder: string | undefined;
  @ViewChild('inputContainerRef') inputContainerEl!: ElementRef;
  @ViewChild('menuItemsRef') menuEl!: ElementRef;
  @ViewChild('filterInputRef') filterInputEl!: ElementRef;

  filterText: string = '';

//  userSelectsString = '';
//  name = 'Angular';
//  _userSelects: any[] = [];
  _selectedItems: ListItem[] = [];



  show: boolean = false;
  worked: boolean = false;

  constructor(private renderer: Renderer2) {
    super();
    // hack for click outside the drop down menu
    this.renderer.listen('window', 'click',(e:Event)=>{
      if (!e.target) { return; }

      let parent = ( <HTMLElement>e.target ).parentElement;
      if(
        this.menuEl
        && e.target!== this.menuEl.nativeElement
        && e.target!== this.inputContainerEl.nativeElement
        && e.target!== this.filterInputEl.nativeElement
        && parent !== this.inputContainerEl.nativeElement
        && parent !== this.menuEl.nativeElement
      ) {
          this.show=false;
      }
    });
  }

  ngOnInit(): void {
  }
/*
  get userSelects() {
    return this._userSelects; 
  }
*/  
  get selectedItems() {
    return this._selectedItems;
  }
  get placeholderText() {
    return this.placeholder;
  }
  get filteredItems() {
    if (!this.filterText || !this.items || !this.items.length) { return this.items; }
    const filterText = this.filterText.toLocaleLowerCase();
    return this.items.filter( (item:any) => {
      return (item.name.toLocaleLowerCase().includes(filterText)) ? true : false;
    });
  }

  toggleMenu() {
    this.show = !this.show;
    if (!this.show && !this.worked) {
      this.worked = true;
    }
  }
  isSelected(s:ListItem) {
    if (!this.selectedItems.length) { return false;}
    return this.selectedItems.findIndex((item: ListItem) => item.id === s.id) > -1 ? true : false;
  }

  selectItem(s: ListItem) {
    this.worked = true;
    if (this.isSelected(s)) {
      this.deleteSelectedItem(s);
    } else {
      this._selectedItems.push(s);
    }
    this.assignToNgModel();
  }

  deleteSelectedItem(s: ListItem) {
    this._selectedItems = this.selectedItems.filter((item : ListItem) => item.id !== s.id);
    this.assignToNgModel();
  }

  assignToNgModel() {
    let selectedIds: string[] = [];
    this.selectedItems.forEach((item) => {
      selectedIds.push(item.id);
    })
    this.input = selectedIds.join(',');
    this.onChange(this.input);
  }

}
