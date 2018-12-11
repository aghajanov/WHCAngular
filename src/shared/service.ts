import { MonthlyChanges } from 'src/shared/monthlychange';
import { Daily } from './../app/daily-change-edit/daily';
import { UserActions } from './user-actions';
import { HttpClient } from "@angular/common/http";
import { Agent } from "./agent";
import { Injectable } from "@angular/core";
import { Status } from "./statuses";

import { MonthlyChangesViewModel } from "./monthly-change-view-model";
import { User } from "./user";
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class AppService {
  private baseUrl = "http://localhost:8080";

  constructor(private _http: HttpClient) {}

  getAgents() {
    return this._http.get<Agent[]>(this.baseUrl + "/agents");
  }

  getAllDailyChanges() {
    return this._http.get<MonthlyChanges[]>(this.baseUrl + "/dailychanges");
  }

  getMonthlyChange(id: number) {
    return this._http.get<MonthlyChanges[]>(
      this.baseUrl + "/monthlychanges/" + id
    );
  }

  getMonthlyChanges() {
    return this._http.get<MonthlyChanges[]>(this.baseUrl + "/monthlychanges");
  }
  
  getMonthes(start:string , end:string){
    return this._http.get<MonthlyChanges[]>(this.baseUrl + "/monthlychanges/" + start + "/" + end);
  }



  getCheckedMonthlyChanges(agentId:number, year:number,month:number,status:boolean ){
    console.log(this.baseUrl + "/checked/" + agentId +'/'+ year+'/'+month + '/' + status);
    return this._http.get<MonthlyChanges>(this.baseUrl + "/checked/" + agentId +'/'+ year+'/'+month + '/' + status);
  }

  saveMonthlyChanges(monthlychanges: MonthlyChanges) {
    return this._http.post<MonthlyChanges>(
      this.baseUrl + "/monthlychanges",
      monthlychanges
    );
  }
  updateMonthlyChanges(monthlychanges: MonthlyChanges) {
    return this._http.put<MonthlyChanges>(
      this.baseUrl + "/monthlychanges/" + monthlychanges.id,
      monthlychanges
    );
  }

  updateDaily(daily:Daily){
    return this._http.put<Daily>("http://localhost:8080/daily/" + daily.id , daily);
  }


  putStatus(id:number,status:boolean) {
    return this._http.put("http://localhost:8080/monthlychanges/" + id +"/" + false , status);
  }
  
  postUserActions(useractions:UserActions){
    return this._http.post<UserActions>(this.baseUrl + "/useractions" , useractions);

  }
  getUserActions(useractions:UserActions){
    return this._http.get(this.baseUrl + "/useractions" + useractions);
  }
  // postStatusFrom(statusFrom:UserActions){
  //   return this._http.

  // }
  
  
  // getMonthly(id: number) {
  //   return this._http.get(this.baseUrl + "/monthlychanges/" + id);
  // }

  getStatuses() {
    return this._http.get<Status[]>(this.baseUrl + "/statuses");
  }

  postUsers(user: User) {
    return this._http.post<User>(this.baseUrl + "/users", user);
  }

  get getCurrentUser() {
    let userId = +localStorage.getItem("userId");

    if (userId) {
      return userId;
    } else {
      return null;
    }
  }

  get isLoggedIn() {
    let userId = localStorage.getItem("userId");

    if (userId) {
      return true;
    } else {
      return false;
    }
  }
}
