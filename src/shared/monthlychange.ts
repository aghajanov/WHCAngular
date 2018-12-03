import { DailyChange } from "./daily-change";
import { Agent } from "./agent";

export class MonthlyChanges {
  id: number;
  agentId: Agent;
  year: number;
  month: number;
  userCreated: number;
  dateCreated: number[];
  lastUpdatedUser: number;
  lastUpdatedDate: number[];
  day1: DailyChange;
  day2: DailyChange;
  day3: DailyChange;
  day4: DailyChange;
  day5: DailyChange;
  day6: DailyChange;
  day7: DailyChange;
  day8: DailyChange;
  day9: DailyChange;
  day10: DailyChange;
  day11: DailyChange;
  day12: DailyChange;
  day13: DailyChange;
  day14: DailyChange;
  day15: DailyChange;
  day16: DailyChange;
  day17: DailyChange;
  day18: DailyChange;
  day19: DailyChange;
  day20: DailyChange;
  day21: DailyChange;
  day22: DailyChange;
  day23: DailyChange;
  day24: DailyChange;
  day25: DailyChange;
  day26: DailyChange;
  day27: DailyChange;
  day28: DailyChange;
  day29: DailyChange;
  day30: DailyChange;
  day31: DailyChange;

  /**
   *
   */
  constructor() {
     this.id=0;
    this.day1 = new DailyChange();
    this.day2 = new DailyChange();
    this.day3 = new DailyChange();
    this.day4 = new DailyChange();
    this.day5 = new DailyChange();
    this.day6 = new DailyChange();
    this.day7 = new DailyChange();
    this.day8 = new DailyChange();
    this.day9 = new DailyChange();
    this.day10 = new DailyChange();
    this.day11 = new DailyChange();
    this.day12 = new DailyChange();
    this.day13 = new DailyChange();
    this.day14 = new DailyChange();
    this.day15 = new DailyChange();
    this.day16 = new DailyChange();
    this.day17 = new DailyChange();
    this.day18 = new DailyChange();
    this.day19 = new DailyChange();
    this.day20 = new DailyChange();
    this.day21 = new DailyChange();
    this.day22 = new DailyChange();
    this.day23 = new DailyChange();
    this.day24 = new DailyChange();
    this.day25 = new DailyChange();
    this.day26 = new DailyChange();
    this.day27 = new DailyChange();
    this.day28 = new DailyChange();
    this.day29 = new DailyChange();
    this.day30 = new DailyChange();
    this.day31 = new DailyChange();
    this.agentId=new Agent();
  }
}
