import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';


interface TableRow {
  loginID: number;
  userID: number;
  account: string;
  status: string;
  name: string;
}

@Component({
  selector: 'app-cfm-history',
  templateUrl: './cfm-history.component.html',
  styleUrls: ['./cfm-history.component.css']
})
export class CFMHistoryComponent implements OnInit {
 //variables that are called by the jumbotron to display "risk values"
 //In theory these values would populate as a result of logic being applied to fraudulent activity 
 //Rather than having manually input data
  highRisk = '3';
  lowRisk = '2';

  //Table being built out and columns being defined 
  myControl = new FormControl('');
  options: string[] = ['BB&T', 'PNC', 'FifthThird', 'Bofa', 'Wells'];
  filteredOptions: Observable<string[]> = new Observable<string[]>(null!);

  //Table being built out and columns being defined 
  statusControl = new FormControl('');
  caseOptions: string[] = ['New', 'In Progress', 'Closed', 'Pending Data'];
  statusFiltered: Observable<string[]> = new Observable<string[]>(null!);

  //Table being built out and columns being defined 
  caseOwnerControl = new FormControl('');
  caseOwnerOptions: string[] = ['Kurt', 'Sofia', 'Darren'];
  caseOwnerFiltered: Observable<string[]> = new Observable<string[]>(null!);
  
  //Constructor that just builds a router to be used to implement some naviagtion functionallity 
  //This way when a row is double clicked on, it redirects the user to the edit page
  constructor(private router: Router) {}
  onRowDoubleClick(row: TableRow) {
    this.router.navigate(['/edit'], { state: { data: row } });
  }

  //Columns and table data being defined
  displayedColumns: string[] = ['loginID', 'userID', 'account', 'status', 'name'];
  dataSource: MatTableDataSource<TableRow> = new MatTableDataSource<TableRow>();
  //This viewchild links the sorting feature to the table data
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngOnInit() {
    //This is tied to the Search Account autocomplete box so that it filters the data
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOptions(value || ''))
    );

    //This is tied to the Status autocomplete box so that it filters the data
    this.statusFiltered = this.statusControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCaseOptions(value || ''))
    );

    //This is tied to the Case Owner autocomplete box so that it filters the data
    this.caseOwnerFiltered = this.caseOwnerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCaseOwnerOptions(value || ''))
    );

    //Manually built out data to go in the table
    const sampleData: TableRow[] = [
      { loginID: 1512, userID: 1253, account: 'Wells', status: 'In Progress', name: 'Kurt' },
      { loginID: 6091, userID: 5912, account: 'BB&T', status: 'New', name: 'Darren' },
      { loginID: 2691, userID: 6901, account: 'BOFA', status: 'New', name: 'Sofia' },
      { loginID: 3601, userID: 1024, account: 'PNC', status: 'Closed', name: 'Sofia' },
      { loginID: 9123, userID: 582, account: 'Fifth Third', status: 'Pending Data', name: 'Darren' },
    ];
    this.dataSource = new MatTableDataSource(sampleData);

    //This subscribes the filtering to the data so it actually updates
    this.caseOwnerControl.valueChanges.subscribe(value => {
      const filterValue = value?.toLowerCase() || '';
      this.dataSource.filter = filterValue.trim().toLowerCase();
    });

    //This subscribes the filtering to the data so it actually updates
    this.statusControl.valueChanges.subscribe(value => {
      const filterValue = value?.toLowerCase() || '';
      this.dataSource.filter = filterValue.trim().toLowerCase();
    });

    //This subscribes the filtering to the data so it actually updates
    this.myControl.valueChanges.subscribe(value => {
      const filterValue = value?.toLowerCase() || '';
      this.dataSource.filter = filterValue.trim().toLowerCase();
    });
  }

  //Each of these filter classes is tied to an autocomplete box and helps filter the data
  private _filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterCaseOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.caseOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterCaseOwnerOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.caseOwnerOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
  
}
