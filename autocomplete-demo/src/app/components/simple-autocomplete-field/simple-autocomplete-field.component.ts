import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'simple-autocomplete-field',
  templateUrl: './simple-autocomplete-field.component.html',
  styleUrls: ['./simple-autocomplete-field.component.scss']
})
export class SimpleAutocompleteFieldComponent  implements OnInit, OnDestroy{
  private subs = new Subscription();
  filteredOptions: Observable<string[]>;
  colorControl = new FormControl();

  constructor(private snackBar: MatSnackBar) {}
  options: string[] = ['Blue', 'Dark Blue', 'Light Blue', 'Green', 'Dark Green', 'Light Green', 'Light Orange', 'Orange', 'Red', 'Dark Red', 'Light Red', 'Yellow'];

/********************************************************************************/
/*   E V E N T S                  */
/********************************************************************************/

  ngOnInit(): void {


    this.filteredOptions = this.colorControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this.array_filter(name) : this.options.slice())
    );
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

/********************************************************************************/
/*   C O M P O N E N T   M E T H O D S                  */
/********************************************************************************/

  // Simple Filter
  private array_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  public onSelectValue(value: string): void {
    this.openSnackBar(`Color selected: ${value}`)
  }
}
