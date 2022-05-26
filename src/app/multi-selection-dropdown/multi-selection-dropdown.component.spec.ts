import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectionDropdownComponent } from './multi-selection-dropdown.component';

describe('MultiSelectionDropdownComponent', () => {
  let component: MultiSelectionDropdownComponent;
  let fixture: ComponentFixture<MultiSelectionDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectionDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
