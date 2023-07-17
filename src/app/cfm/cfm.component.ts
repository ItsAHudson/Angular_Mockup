import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { Router } from '@angular/router';


interface TableRow {
  loginID: number;
  userID: number;
  account: string;
  status: string;
  name: string;
}

//This typescript is similar to cfm-history with the only difference being the data is generated
//automatically like within transaction monitoring
@Component({
  selector: 'app-cfm',
  templateUrl: './cfm.component.html',
  styleUrls: ['./cfm.component.css']
})
export class CfmComponent implements OnInit, AfterViewInit {
  highRisk = '32';
  lowRisk = '21';

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  ngAfterViewInit() {
    this.CFMData.paginator = this.paginator
  }

  myControl = new FormControl('');
  options: string[] = ['BB&T', 'PNC', 'FifthThird', 'Bofa', 'Wells'];
  filteredOptions: Observable<string[]> = new Observable<string[]>(null!);

  statusControl = new FormControl('');
  caseOptions: string[] = ['New', 'In Progress', 'Closed', 'Pending Data'];
  statusFiltered: Observable<string[]> = new Observable<string[]>(null!);

  caseOwnerControl = new FormControl('');
  caseOwnerOptions: string[] = ['Kurt', 'Sofia', 'Darren'];
  caseOwnerFiltered: Observable<string[]> = new Observable<string[]>(null!);

  //This constructor is currently inactive as it is not linked anywhere in the component
  constructor(private router: Router) {}
  onRowDoubleClick(row: TableRow) {
    this.router.navigate(['/edit'], { state: { data: row } });
  }

  Data: any[] =[];
  CFMColumns: string[] = ['loginID', 'userID', 'account', 'status', 'name'];
  CFMData: MatTableDataSource<TableRow> = new MatTableDataSource<TableRow>();
  @ViewChild('CFMPaginator', { read: MatPaginator }) CFMPaginator: any = MatPaginator;


  generateCFMData(CFMRows: number) {
    for (let i = 1; i <= CFMRows; i++) {
      const row = {
        loginID: `loginID ${i}`,
        userID: `userID ${i}`,
        account: `account ${i}`,
        status: `status ${i}`,
        name: `name ${i}`,
      };
      this.Data.push(row);
    }
    this.CFMData = new MatTableDataSource(this.Data);
  }

  ngOnInit() {

    this.generateCFMData(20);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOptions(value || ''))
    );

    this.statusFiltered = this.statusControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCaseOptions(value || ''))
    );

    this.caseOwnerFiltered = this.caseOwnerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCaseOwnerOptions(value || ''))
    );

    this.caseOwnerControl.valueChanges.subscribe(value => {
      const caseFilter = value?.toLowerCase() || '';
      this.CFMData.filter = caseFilter.trim().toLowerCase();
    });

    this.statusControl.valueChanges.subscribe(value => {
      const filterValue = value?.toLowerCase() || '';
      this.CFMData.filter = filterValue.trim().toLowerCase();
    });

    this.myControl.valueChanges.subscribe(value => {
      const filterValue = value?.toLowerCase() || '';
      this.CFMData.filter = filterValue.trim().toLowerCase();
    });
  }

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
