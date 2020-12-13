import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAutocompleteFieldComponent } from './simple-autocomplete-field.component';

describe('SimpleAutocompleteFieldComponent', () => {
  let component: SimpleAutocompleteFieldComponent;
  let fixture: ComponentFixture<SimpleAutocompleteFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleAutocompleteFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleAutocompleteFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
