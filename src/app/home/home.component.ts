import { UserActions } from "./../../shared/user-actions";
import { Status } from "./../../shared/statuses";
import { Component, OnInit, Input, NgModuleRef } from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
  NgbPopoverConfig,
  NgbModalOptions,
  NgbDateStruct,
  NgbDate,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { MonthlyChanges } from "src/shared/monthlychange";
import { AppService } from "src/shared/service";
import { Agent } from "src/shared/agent";
import { NgbdModalContent } from "../main/modal-component";
import { DailyChange } from "src/shared/daily-change";
import { MonthlyChangesViewModel } from "src/shared/monthly-change-view-model";
import { Router } from "@angular/router";
import { DailyChangeEditComponent } from "../daily-change-edit/daily-change-edit.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @Input() name;
  public monthlyChange: MonthlyChangesViewModel;
  model: NgbDateStruct;
  monthlyChanges: MonthlyChanges[] = [];
  userActions: UserActions[] = [];
  agents: Agent[];
  statuses: Status[];
  backgroundColor: string;
  dateFrom: NgbDate;
  dateTo: NgbDate;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private service: AppService,
    config: NgbPopoverConfig,
    private rout: Router,
    private parserFormatter: NgbDateParserFormatter
  )
   {
    config.placement = "right";
    config.triggers = "hover";
    this.monthlyChange = new MonthlyChangesViewModel();

    let now = new Date();
    let lastday = this.getLastDayOfMonth(now.getFullYear(), now.getMonth());

    this.dateFrom = new NgbDate(now.getFullYear(), now.getMonth() + 1, 1);

    this.dateTo = new NgbDate(now.getFullYear(), now.getMonth() + 1, lastday);
  }

  ngOnInit() {
    this.service.getStatuses().subscribe(data => {  
      this.statuses = data;
      
    });
           
    this.service.getAgents().subscribe(
      data => {  
        this.agents = data;
        // this.LoadWhc();
      },
      error => {}
    );

    this.LoadWhc();
  }
  getLastDayOfMonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent,{ size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.name = "World";
    modalRef.result.then(
      () => {
        this.LoadWhc();
      },
      () => {}
    );
  }

  onDateFromSelected(dateFrom: NgbDate) {
    this.dateFrom = dateFrom;
  }

  onDateToSelected(dateFrom: NgbDate) {
    this.dateTo = dateFrom;
  }

  getClassName(type: string) {
    type = type.trim();
    switch (type) {
      case "ND":
        this.backgroundColor = "#299968";
        break;
      case "X":
        this.backgroundColor = "#f70000";
        break;
      case "I":
        this.backgroundColor = "#f3f700";
        break;
      case "Q-N":
        this.backgroundColor = "#42f448";
        break;
      case "M":
        this.backgroundColor = "#d600f7";
        break;
      case "M-O":
        this.backgroundColor = "#456d9e";
        break;
      case "T":
        this.backgroundColor = "#ff7119";
        break;
      case "EGBNS":
        this.backgroundColor = "#827658";
        break;
      case "A":
        this.backgroundColor = "#3ba1c6";
        break;
      default:
        this.backgroundColor = "white";
        break;
    }
    return this.backgroundColor;
  }

 

  edit(day: DailyChange, monthlyChanges: MonthlyChanges) {
    console.log("day" , day);
    const modalRef = this.modalService.open(DailyChangeEditComponent);
    (<DailyChangeEditComponent>modalRef.componentInstance).oldStatus =
      day.statusId.id;
    (<DailyChangeEditComponent>modalRef.componentInstance).monthlyChange =
    monthlyChanges;
    (<DailyChangeEditComponent>modalRef.componentInstance).dailyChange = day;
    modalRef.componentInstance.name = "World";
    this.updateMonthlyChanges(monthlyChanges);
    modalRef.result.then(
      () => {
        this.LoadWhc();
      },
      () => {
        this.LoadWhc();
      }
    );
  }

 

  logOff() {
    localStorage.removeItem("userId");
    this.rout.navigateByUrl("");
    // form.reset();
  }

  deleteMonthlyChange(monthlyChanges: MonthlyChanges) {
    monthlyChanges.status = false;
    this.service.putStatus(monthlyChanges.id, false).subscribe(
      data => {
        console.log(data + "put status");
      },
      error => {
        console.log(error);
      }
    );
    this.updateMonthlyChanges(monthlyChanges);
  }

  updateMonthlyChanges(monthlyChanges: MonthlyChanges) {
    let d = new Date();
    monthlyChanges.lastUpdatedUser = this.service.getCurrentUser;
    monthlyChanges.lastUpdatedDate = [
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    ];
   
    this.service.updateMonthlyChanges(monthlyChanges).subscribe(
      data =>{console.log(data)},
      error => {console.log(error)}


    )

  }

  private  LoadWhc() {
    // this.service.getMonthlyChanges().subscribe(
    //   data => {
    //     console.log(data);
    //     this.monthlyChanges = data;
    //   },
    //   error => {       
    //   }
    // );
    this.getMonthes();
  }

  getMonthes() {
    let dayOfEndDay = "";
    let dayOfStartDay = "";
    let dayOfEndMonth = "";
    let dayOfStartMonth = "";
    if (this.dateTo.day < 10) {
      dayOfEndDay = 0 + "" + this.dateTo.day;
    } else {
      dayOfEndDay = this.dateTo.day + "";
    }
    if (this.dateTo.month < 10) {
      dayOfEndMonth = 0 + "" + this.dateTo.month;
    } else {
      dayOfEndMonth = this.dateTo.month + "";
    }

    if (this.dateFrom.month < 10) {
      dayOfStartMonth = 0 + "" + this.dateFrom.month;
    } else {
      dayOfStartMonth = this.dateFrom.month + "";
    }

    if (this.dateFrom.day < 10) {
      dayOfStartDay = 0 + "" + this.dateFrom.day;
    } else {
      dayOfEndDay = "" + this.dateFrom.day;
    }
    let endDate = this.dateTo.year + "-" + dayOfEndMonth + "-" + dayOfEndDay;
    let startDate =
      this.dateFrom.year + "-" + dayOfStartMonth + "-" + dayOfStartDay;

    this.service.getMonthes(startDate, endDate).subscribe(
      data => {
        console.log('data',data);
        this.monthlyChanges = data;
        console.log("sjs" , this.monthlyChanges)
      },
      error => {
        console.log(error);
      }
    );
  }
}
