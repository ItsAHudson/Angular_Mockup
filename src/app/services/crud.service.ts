import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private _http: HttpClient) { }

  //API data management
  //This will not work unless JSON server is installed via NPM
  //json-server --watch db.json use this command to start the JSON server
  //Good practice to have multiple terminals open, one for server, one for CLI, one for Angular server

  //post used to save data
  addData(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/crud', data)
  }

  //get used to pull data
  getDataList(): Observable<any> {
    return this._http.get('http://localhost:3000/crud')
  }

  deleteData(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/crud/${id}`);
  }

  //put used to update pre-existing data
  updateData(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/crud/${id}`, data)
  }
  
}
