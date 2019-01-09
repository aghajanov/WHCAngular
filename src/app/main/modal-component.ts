
import { DailyChange } from './../../shared/daily-change';
import { Status } from './../../shared/statuses';
import { UserActions } from "../../shared/user-actions";
import { Component, Input, OnInit } from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
  NgbCalendar,
  NgbDateStruct,
  NgbDate
}
from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/shared/service";
import { Agent } from "src/shared/agent";

import { MonthlyChanges } from "src/shared/monthlychange";
import { MonthlyChangesViewModel } from "src/shared/monthly-change-view-model";
import { Daily } from '../daily-change-edit/daily';


@Component({
  selector: "ngbd-modal-content",
  templateUrl: "./modal-component.html"
})
export class NgbdModalContent implements OnInit {
  agents: Agent[] = [];
  public monthlyChange: MonthlyChangesViewModel;
  dateCreated: string;
  userCreated: string;
  statuses: Status[] = [];
  model: NgbDateStruct;
  currentDate: NgbDate;
  period: number = 5;
 public monthlyChanges: MonthlyChanges[] = [];
  currentStatus;
  constructor(
    public activeModal: NgbActiveModal,
    private service: AppService,
    private calendar: NgbCalendar
  ) {
    let now = new Date();
    this.currentDate = new NgbDate(now.getFullYear() , now.getMonth()+1, now.getDay()+9); 
    this.monthlyChange = new MonthlyChangesViewModel();
  }
  getLastDayOfMonth(y, m) {
    return new Date(y, m +1, 0).getDate();
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
        console.log("statuses" + this.statuses)
      },
      error => {}
    );
  }

  onDateFromSelected(currentDate: NgbDate) {
    
    this.currentDate = currentDate;
    console.log("crcrcrda" ,this.currentDate);
  }

  @Input() name;

  onSubmit(form) {
    let mc = this.getMonthlyChange();
    
    this.service
      .getCheckedMonthlyChanges(
        mc.agentId.agentId,
        mc.dateCreated[0],
        mc.dateCreated[1],
        mc.status= true
      )
      .subscribe(
        x => {
         
          if (x) {

            alert('This row already exists');
            return;
            // console.log("if(mc) >", mc);
            // mc.id = x.id;
            // this.service.updateMonthlyChanges(mc).subscribe(x => {});
          } else {
     
            console.log("if(mc) >", mc);
            this.saveNewmonthlyChange(mc);
          
          }
        },
        error => {
          console.log(error);
          this.saveNewmonthlyChange(mc);
        }
      );
  }

  private saveNewmonthlyChange(mc: MonthlyChanges) {
         
         
    this.service.saveMonthlyChanges(mc).subscribe(monthlyChng => {
      if (this.period > 0){
             for(let i= 0 ; i<=this.period;i++){
                let dc = this.monthlyChange.day;
                let daily = new Daily();
                daily.agentTo = dc.agentTo
                daily.comment = dc.comment;
                daily.id = dc.id;
                daily.shiftFrom = dc.shiftFrom;
                daily.shiftTo= dc.shiftTo;
                daily.statusId = dc.statusId.id;
              
                this.service.updateDaily(daily).subscribe(
                  data => {console.log(data)},
                  error =>{console.log(error)} 
                )
                
              
             }
      } 
     


      let date = new Date();
      
     
      let userActions = new UserActions();
      userActions.userId = this.service.getCurrentUser;
      userActions.dateChanged = [
        monthlyChng.dateCreated[0],
        monthlyChng.dateCreated[1],
        monthlyChng.dateCreated[2],
        monthlyChng.dateCreated[3],
        monthlyChng.dateCreated[4],
      ];
      userActions.dateCreated = [
        date.getFullYear()+0,
        date.getMonth() + 1,
        date.getDay() + 9,
        0,
    
        
        
      ];
      userActions.monthlyChangesId = monthlyChng;
      userActions.statusFrom =this.monthlyChange.day.statusId.id;
      userActions.statusTo =  this.monthlyChange.day.statusId.id;
      console.log('userAction',userActions);

      this.service
        .postUserActions(userActions)
        .subscribe(
          x => console.log("x:", x),
          error => console.log("error", error)
        );
    });

     

  }

  isNdSelected:boolean;
  onChange(value){
    this.isNdSelected=(value==1)
    // alert(this.isNdSelected);
  }

  getMonthlyChange(): MonthlyChanges {
    let dc = new DailyChange();
    console.log(this.monthlyChange);
    dc.agentTo = this.monthlyChange.day.agentTo;
    dc.shiftFrom = this.monthlyChange.day.shiftFrom;
    dc.shiftTo = this.monthlyChange.day.shiftTo;
    dc.statusId = this.monthlyChange.day.statusId;
    dc.comment = this.monthlyChange.day.comment;
    
    let mc = new MonthlyChanges();
    mc.dateCreated = [this.currentDate.year, this.currentDate.month, this.currentDate.day, 0, 0];
    
    switch (this.currentDate.day) {
      case 1:
        mc.day1 = dc;
        break;
      case 2:
        mc.day2 = dc;
        break;
      case 3:
        mc.day3 = dc;
        break;
      case 4:
        mc.day4 = dc;
        break;
      case 5:
        mc.day5 = dc;
        break;
      case 6:
        mc.day6 = dc;
        break;
      case 7:
        mc.day7 = dc;
        break;
      case 8:
        mc.day8 = dc;
        break;
      case 9:
        mc.day9 = dc;
        break;
      case 10:
        mc.day10 = dc;
        break;
      case 11:
        mc.day11 = dc;
        break;
      case 12:
        mc.day12 = dc;
        break;
      case 13:
        mc.day13 = dc;
        break;
      case 14:
        mc.day14 = dc;
        break;
      case 15:
        mc.day15 = dc;
        break;
      case 16:
        mc.day16 = dc;
        break;
      case 17:
        mc.day17 = dc;
        break;
      case 18:
        mc.day18 = dc;
        break;
      case 19:
        mc.day19 = dc;
        break;
      case 20:
        mc.day20 = dc;
        break;
      case 21:
        mc.day21 = dc;
        break;
      case 22:
        mc.day22 = dc;
        break;
      case 23:
        mc.day23 = dc;
        break;
      case 24:
        mc.day24 = dc;
        break;
      case 25:
        mc.day25 = dc;
        break;
      case 26:
        mc.day26 = dc;
        break;
      case 27:
        mc.day27 = dc;
        break;
      case 28:
        mc.day28 = dc;
        break;
      case 29:
        mc.day29 = dc;
        break;
      case 30:
        mc.day30 = dc;
        break;
      case 31:
        mc.day31 = dc;
        break;
      default:
        return null;
    }
    mc.userCreated = this.service.getCurrentUser;
    mc.year = this.currentDate.year;
    mc.month = this.currentDate.month;
   
    let agent = this.agents.filter(
      x => x.agentId == this.monthlyChange.agentId.agentId
    );
    mc.agentId = agent[0];
    mc.id = this.monthlyChange.id;
    return mc;
  }


  private LoadWhc() {
    this.service.getMonthlyChanges().subscribe(
      data => {
        this.monthlyChanges = data;
      },
      error => {}
    );
  }
}
