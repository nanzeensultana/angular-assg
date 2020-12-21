import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-hw3';
   data : any  = []
settings = {
  add:{
  confirmCreate:true
  },
  delete: {
    confirmDelete: true,
  },
  edit:{
    confirmSave: true,
  },
columns: {
  name: {
    title: 'Full Name'
  },
  catches: {
    title: 'Catches',
    editable:true
  },
  runs: {
    title: 'Runs',
    editable:true
  },
  wickets: {
    title: 'Wickets',
    editable:true
  },

}

};

  constructor(private http:HttpClient){

  }
  ngOnInit(){
    let req_data ={
      "action":"search",
      "data":{
        "runs":"1"
      },
      "limit":0
    }
    this.http.post('http://localhost:3000/action',req_data).subscribe((dat)=>{
      this.data=dat;

    })

  }
  onCreateConfirm(event){
    let req_data={
      "action":"insert",
      "data":{
        "name":event.newData.name,
        "wickets":event.newData.wickets,
        "catches":event.newData.catches,
        "runs":event.newData.runs
      },
      "limit":0
    }

    this.http.post('http://localhost:3000/action',req_data).subscribe((dat)=>{
      event.confirm.resolve();

    })
  }

  onDeleteConfirm(event){
    let req_data={
      "action":"delete",
      "where":{
        "name":event.data.name
      },
      "limit":0
    }
    this.http.post('http://localhost:3000/action',req_data).subscribe((dat)=>{
      event.confirm.resolve();

    })
  }

  onEditConfirm(event){
    let req_data={
      "action":"update",
      "data":{
        "runs":event.newData.runs,
        "catches":event.newData.catches,
        "wickets":event.newData.wickets
      },
      "where":{
        "name":event.data.name
      },
      "limit":0
    }

    this.http.post('http://localhost:3000/action',req_data).subscribe((dat)=>{
      event.confirm.resolve();

    })
  }

  runSortAsc(){
    let req_data={
      "action":"search",
      "data":{
        "runs":"1"
      },
      "limit":0
    }

    this.http.post('http://localhost:3000/action',req_data).subscribe((dat)=>{
      this.data=dat

    })
  }

  runSortDsc(){
    let req_data={
      "action":"search",
      "data":{
        "runs":"-1"
      },
      "limit":0
    }

    this.http.post('http://localhost:3000/action',req_data).subscribe((dat)=>{
      this.data=dat

    })
  }

  TopWickets(){
    let req_data={
      "action":"search",
      "data":{
        "wickets":"-1"
      },
      "limit":5
    }

    this.http.post('http://localhost:3000/action',req_data).subscribe((dat)=>{
      this.data=dat

    })
  }
}
