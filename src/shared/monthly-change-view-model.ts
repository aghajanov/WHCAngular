import { Status } from "./statuses";
import { Agent } from "./agent";
import { DailyChange } from "./daily-change";


export class MonthlyChangesViewModel{
   id:number;
   agentId:Agent;
   year: number;
   month: number;
   userCreated: number;
   dateCreated: number[];
   lastUpdatedUser:number;
   lastUpdatedDate:number;
   day:DailyChange;
   
  

   /**
    *
    */
   constructor() {
    this.id=0;
    this.agentId=new Agent();
    this.day=new DailyChange();
   }
}