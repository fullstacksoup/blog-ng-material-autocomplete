import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeoLocationService } from './services/geo-location.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

export interface User {
  name: string;
}

export interface USStates {
  name: string;
  abbreviation: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  private subs = new Subscription();
  jsonDataOptions: USStates[] = [];
  filteredJSONDataOptions: Observable<any[]>;
  filteredColorOptions: Observable<string[]>;
  arrayControl = new FormControl();
  jsonControl = new FormControl();

  constructor(private geoSVC: GeoLocationService) {}
  arrayOptions: string[] = ['Blue', 'Green', 'Orange', 'Red', 'Yellow'];

/********************************************************************************/
/*   E V E N T S                  */
/********************************************************************************/

  ngOnInit(): void {
   this.subs.add(this.geoSVC.getColors().subscribe((data) => {
      this.jsonDataOptions = data;
      // console.log(this.options);
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));

    this.filteredJSONDataOptions = this.jsonControl.valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter(value))
    );


    this.filteredColorOptions = this.arrayControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this.array_filter(name) : this.arrayOptions.slice())
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
    // console.log(value);
    this.jsonDataOptions.forEach(element => {
      if (element.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newList.push({'name': element.name, 'abbreviation': element.abbreviation });
        // console.log(element);
      }

    })
    return newList;
  }

  // Simple Filter
  private array_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.arrayOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  public onSelectState(value: string): void {
    console.log('State abbreviation selected: ', value);
  }

  public onSelectArrayValue(value: string): void {
    console.log('Array Value selected: ', value);
  }
}
