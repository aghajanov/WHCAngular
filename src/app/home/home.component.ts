import { Component, OnInit, Input, NgModuleRef } from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
  NgbPopoverConfig,
  NgbModalOptions
} from "@ng-bootstrap/ng-bootstrap";
import { MonthlyChanges } from "src/shared/monthlychange";
import { AppService } from "src/shared/service";
import { Agent } from "src/shared/agent";
import { NgbdModalContent } from "../main/modal-component";
import { DailyChange } from "src/shared/daily-change";
import { MonthlyChangesViewModel } from "src/shared/monthly-change-view-model";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @Input() name;

  monthlyChanges: MonthlyChanges[] = [];
  agents: Agent[];

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private service: AppService,
    config: NgbPopoverConfig,
    private rout:Router

  ) {
    config.placement = "right";
    config.triggers = "hover";
  }

  open() {
    console.log("modal");
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = "World";
    modalRef.result.then(
      () => {
        this.LoadWhc();
      },
      () => {}
    );
  }

  edit(monthlyChange: MonthlyChanges, day: DailyChange) {
    console.log("edit clicked");

    if (!day) {
      alert("this cell is empty.please try filled cell to open update form");
      return;
    }
    let mcvm = new MonthlyChangesViewModel();
    mcvm.day = day;
    mcvm.dateCreated = monthlyChange.dateCreated;
    mcvm.year = monthlyChange.year;
    mcvm.year = monthlyChange.month;
    mcvm.agentId = monthlyChange.agentId;
    mcvm.id=monthlyChange.id;
    const modalRef = this.modalService.open(NgbdModalContent);
    console.log(monthlyChange);
    (<NgbdModalContent>modalRef.componentInstance).monthlyChange = mcvm;
    (<NgbdModalContent>modalRef.componentInstance).model = {
      year: mcvm.dateCreated[0],
      month: mcvm.dateCreated[1],
      day: mcvm.dateCreated[2]
    };
    modalRef.componentInstance.name = "World";
    modalRef.result.then(
      () => {
        this.LoadWhc();
      },
      () => {}
    );
  }
  ngOnInit() {
    this.LoadWhc();
    this.service.getAgents().subscribe(
      data => {
        this.agents = data;
      },
      error => {}
    );
  }
  
  logOff(form:HTMLFormElement){    
    localStorage.removeItem('userId');  
    this.rout.navigateByUrl('');
    form.reset();
  }



  deleteMonthlyChange(monthlyChanges) {
    this.service.deleteMonthlyChange(monthlyChanges.id).subscribe(
      data => {
        this.monthlyChanges.splice(
          this.monthlyChanges.indexOf(monthlyChanges),
          1
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  private LoadWhc() {
    this.service.getMonthlyChanges().subscribe(
      data => {
        this.monthlyChanges = data;
      },
      error => {
       
      }
    );
  }
}
