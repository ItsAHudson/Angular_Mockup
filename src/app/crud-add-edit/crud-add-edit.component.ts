import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { DialogRef } from '@angular/cdk/dialog'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-crud-add-edit',
  templateUrl: './crud-add-edit.component.html',
  styleUrls: ['./crud-add-edit.component.css']
})
export class CrudAddEditComponent implements OnInit{
  crudForm: FormGroup;

  //a constructor building out a FormBuilder, CrudService, and Dialog class
  constructor(
    private _fb: FormBuilder, 
    private _crudService: CrudService,
    private _dialogRef: DialogRef<CrudAddEditComponent>,
    //an injection that sends data to the dialog when it is edited
    @Inject(MAT_DIALOG_DATA) public data: any
    ) 
    //A constructed form using the formbuilder, blank data so that it can be overwritten with the jsonserver data
    {
    this.crudForm = this._fb.group ({
      firstName: '',
      lastName: '',
      email: '',
    })
  }

  ngOnInit(): void {
      //This patches data into the table when editing
      this.crudForm.patchValue(this.data)
  }

  //This function sends a post/put request to the API
  //Nested if that first checkes if the data is valid, then checks if there is data present
  //If data is present a put request is sent via the updateData function
  //These nested functions are being called from the crud service
  onFormSubmit() {
    if(this.crudForm.valid) {
      if(this.data) {
        this._crudService.updateData(this.data.id, this.crudForm.value).subscribe({
          next: (val: any) => {
            //The Alert is just for testing purposes to indicate everything went ok
            //The dialogref.close closes out the dialog after a successful call to the API and then the page is reloaded to refresh the data
            //Probably can be more efficient with data reloading but for testing purposes a page reload will suffice 
            alert('Update Successful');
            this._dialogRef.close();
            window.location.reload();
          },
          error: console.log,
        })
      }
      //Else (if data is not present) a post request is sent via the addData function
      else {
        this._crudService.addData(this.crudForm.value).subscribe({
          next: (val: any) => {
            alert('Data Addition Successful');
            this._dialogRef.close();
            window.location.reload();
          },
          error: console.log,
        })
      }

    }
  }

}