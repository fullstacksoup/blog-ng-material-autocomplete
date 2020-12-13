import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeoLocationService } from 'src/app/services/geo-location.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface USStates {
  name: string;
  abbreviation: string;
}

@Component({
  selector: 'json-autocomplete-field',
  templateUrl: './json-autocomplete-field.component.html',
  styleUrls: ['./json-autocomplete-field.component.scss']
})
export class JsonAutocompleteFieldComponent implements OnInit, OnDestroy{
  private subs = new Subscription();
  options: USStates[] = [];
  filteredJSONDataOptions: Observable<any[]>;
  jsonControl = new FormControl();

  constructor(private geoSVC: GeoLocationService, private snackBar: MatSnackBar) {}

/********************************************************************************/
/*   E V E N T S                  */
/********************************************************************************/

  ngOnInit(): void {
   this.subs.add(this.geoSVC.getColors().subscribe((data) => {
      this.options = data;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));

    this.filteredJSONDataOptions = this.jsonControl.valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter(value))
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

  // JSON Data Filter
  private json_data_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    let newList = [];
    this.options.forEach(element => {
      if (element.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newList.push({'name': element.name, 'abbreviation': element.abbreviation });
      }

    })
    return newList;
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  public onSelectState(value: string): void {
    this.openSnackBar(`State abbreviation selected: ${value}`)
  }

}
