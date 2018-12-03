import { UserActions } from './user-actions';
import { HttpClient } from "@angular/common/http";
import { Agent } from "./agent";
import { Injectable } from "@angular/core";
import { Status } from "./statuses";
import { MonthlyChanges } from "./monthlychange";
import { MonthlyChangesViewModel } from "./monthly-change-view-model";
import { User } from "./user";

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

  getCheckedMonthlyChanges(agentId:number, year:number,month:number){
    console.log(this.baseUrl + "/checked/" + agentId +'/'+ year+'/'+month);
    return this._http.get<MonthlyChanges>(this.baseUrl + "/checked/" + agentId +'/'+ year+'/'+month);
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
  deleteMonthlyChange(id: number) {
      console.log(id);
    return this._http.delete(this.baseUrl + "/monthlychanges/" + id);
  }
  
  postUserActions(useractions:UserActions){
    return this._http.post<UserActions>(this.baseUrl + "/useractions" , useractions);

  }

  getMonthly(id: number) {
    return this._http.get(this.baseUrl + "/monthlychanges/" + id);
  }

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
