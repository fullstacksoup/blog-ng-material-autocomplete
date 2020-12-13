import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonAutocompleteFieldComponent } from './json-autocomplete-field.component';

describe('JsonAutocompleteFieldComponent', () => {
  let component: JsonAutocompleteFieldComponent;
  let fixture: ComponentFixture<JsonAutocompleteFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonAutocompleteFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonAutocompleteFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
