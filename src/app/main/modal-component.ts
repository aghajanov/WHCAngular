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
import { MonthlyChanges } from "src/shared/monthlychange";
import { MonthlyChangesViewModel } from "src/shared/monthly-change-view-model";
import { DailyChange } from "src/shared/daily-change";

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

  constructor(
    public activeModal: NgbActiveModal,
    private service: AppService,
    private calendar: NgbCalendar
  ) {
    this.monthlyChange = new MonthlyChangesViewModel();
  }

  ngOnInit() {
    console.log("", this.monthlyChange);
    this.service.getAgents().subscribe(
      data => {
        this.agents = data;
      },
      error => {}
    );

    this.service.getStatuses().subscribe(
      data => {
        this.statuses = data;
      },
      error => {}
    );
  }
  @Input() name;

  onSubmit() {
    let mc = this.getMonthlyChange();
    console.log("mc>>>", mc);

    this.service
      .getCheckedMonthlyChanges(
        mc.agentId.agentId,
        mc.dateCreated[0],
        mc.dateCreated[1]
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
          this.saveNewmonthlyChange(mc);
        }
      );
  }

  private saveNewmonthlyChange(mc: MonthlyChanges) {
    this.service.saveMonthlyChanges(mc).subscribe(monthlyChng => {
      console.log(monthlyChng);
      let date = new Date();
      let userActions = new UserActions();
      userActions.userId = this.service.getCurrentUser;
      userActions.dateChanged = [
        monthlyChng.dateCreated[0],
        monthlyChng.dateCreated[1],
        monthlyChng.dateCreated[2],
        0,
        0
      ];
      userActions.dateCreated = [
        date.getFullYear(),
        date.getMonth(),
        date.getDay(),
        0,
        0
      ];
      userActions.monthlyChangesId = monthlyChng;
      userActions.statusFrom = 2;
      userActions.statusTo = 5;
      console.log(JSON.stringify(userActions));
      this.service
        .postUserActions(userActions)
        .subscribe(
          x => console.log("x:", x),
          error => console.log("error", error)
        );
    });
  }

  getMonthlyChange(): MonthlyChanges {
    let dc = new DailyChange();
    console.log(this.monthlyChange);
    dc.agentTo = this.monthlyChange.day.agentTo;
    dc.shiftFrom = this.monthlyChange.day.shiftFrom;
    dc.shiftTo = this.monthlyChange.day.shiftTo;
    dc.statusId = this.monthlyChange.day.statusId;

    let mc = new MonthlyChanges();
    mc.dateCreated = [this.model.year, this.model.month, this.model.day, 0, 0];
    switch (this.model.day) {
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
    mc.year = this.model.year;
    mc.month = this.model.month;
    let agent = this.agents.filter(
      x => x.agentId == this.monthlyChange.agentId.agentId
    );
    mc.agentId = agent[0];
    mc.id = this.monthlyChange.id;
    return mc;
  }
}
