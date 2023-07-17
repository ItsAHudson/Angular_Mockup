import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { CrudAddEditComponent } from '../crud-add-edit/crud-add-edit.component';
import { CrudService } from '../services/crud.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //table definer, the action column is for the edit and trash icons
  tableColumns: string[] = ['firstName', 'lastName', 'email', 'action'];
  dataSource!: MatTableDataSource<any>

  constructor(private _dialog: MatDialog, private _crudListService: CrudService) {}

  //OnInit the getList function is called in order to populate the table with data from the JSON server
  ngOnInit(): void {
      this.getList();   
         
  }

  //Simple function that triggers the crud dialog to add data
  openAddEdit(){
    this._dialog.open(CrudAddEditComponent)
  }

  //This function gets the data from the json server API and puts it in a table that can be displayed within the component
  getList(){
    this._crudListService.getDataList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    })
  }

  //This function gets the ID of a particular data point, calls that id within the API and deletes the respective row of data
  deleteCrud(id: number) {
    this._crudListService.deleteData(id).subscribe({
      next: (res) => {
        alert('Deletion Successful');
        window.location.reload();
      },
      error: console.log,
    })
  }

  //This function passes the firstName value to element so that it loads in the input box everytime the edit button is clicked
  //This function also opens the crud-add-edit dialog and passes data to it so that it can be edited 
  element: string = ''
  editCrud(data: any) {
    this.element = data.firstName
    this._dialog.open(CrudAddEditComponent, {
      data,
    });
  }
}
