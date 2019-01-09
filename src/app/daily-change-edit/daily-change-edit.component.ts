import { MonthlyChangesViewModel } from './../../shared/monthly-change-view-model';
import { MonthlyChanges } from "src/shared/monthlychange";
import { UserActions } from "../../shared/user-actions";
import { Component, Input, OnInit } from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
  NgbCalendar,
  NgbDateStruct,
  NgbDate
} from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/shared/service";
import { Agent } from "src/shared/agent";
import { Status } from "src/shared/statuses";
import { DailyChange } from "src/shared/daily-change";
import { Daily } from "./daily";

@Component({
  selector: "app-daily-change-edit",
  templateUrl: "./daily-change-edit.component.html",
  styleUrls: ["./daily-change-edit.component.css"]
})
export class DailyChangeEditComponent implements OnInit {
  agents: Agent[] = [];
  public monthlyChanges: MonthlyChangesViewModel
  public dailyChange: DailyChange;
  public monthlyChange: MonthlyChanges;
  dateCreated: string;
  userCreated: string;
  public oldStatus:number;
  currentDate: NgbDate;
  statuses: Status[] = [];
  model: NgbDateStruct;
  daily: Daily;

  @Input() name;
  constructor(
    public activeModal: NgbActiveModal,
    private service: AppService,
    private calendar: NgbCalendar
  ) {
    let now = new Date();
    this.currentDate = new NgbDate(now.getFullYear(), now.getMonth(), now.getDay());    
    this.dailyChange = new DailyChange();
    this.monthlyChange = new MonthlyChanges();
  }
  getLastDayOfMonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }
  ngOnInit() {
    this.service.getAgents().subscribe(
      data => {
        this.agents = data;
      },
      error => {}
    );

    this.service.getStatuses().subscribe(
      data => {
        this.statuses = data;
        console.log(this.statuses);
      },
      error => {}
    );
  }  


  isNdSelected:boolean;
  onChange(value){
    this.isNdSelected=(value==1)
    // alert(this.isNdSelected);
  }

  onSubmit() {
    
    let mc = new MonthlyChanges();
    let dc = new Daily();
   
    dc.agentTo = this.dailyChange.agentTo;
    (dc.id = this.dailyChange.id), 
    (dc.shiftFrom = this.dailyChange.shiftFrom);
    dc.shiftTo = this.dailyChange.shiftTo;
    dc.statusId = this.dailyChange.statusId.id;
    dc.comment = this.dailyChange.comment;
    
   
    this.service.updateDaily(dc).subscribe(
      data => {
       
        let userAction = new UserActions();
        let now = new Date();
        userAction.dateCreated = [
          now.getFullYear() + 0,
          now.getMonth() + 1,
          now.getDay() + 2,
          +now.getHours(),
          +now.getMinutes()
        ];
        
        userAction.dateChanged = [
          this.monthlyChange.dateCreated[0],
          this.monthlyChange.dateCreated[1],
          this.monthlyChange.dateCreated[2],
          +this.monthlyChange.dateCreated[3],
          +this.monthlyChange.dateCreated[4]
         ];
        userAction.statusFrom = this.oldStatus;
        userAction.statusTo = this.dailyChange.statusId.id;
        userAction.userId = this.service.getCurrentUser;
        userAction.monthlyChangesId = this.monthlyChange; //monthly change id must be added instead
        
       
        console.log(userAction);
        this.service.postUserActions(userAction).subscribe(x=>{
          alert('success');
          console.log(x);
        },error=>console.log(error));
      },
      error => {
        console.log(error);
      }
    ),error=>console.log(error);
    

   



  }
}
