import { Daily } from './../app/daily-change-edit/daily';
import { Status } from "./statuses";

export class DailyChange {
    id:number;
    statusId: Status;
    agentTo: string;
    shiftFrom: number;
    shiftTo: number;

    constructor() {
        this.statusId=new Status();
        // let daily  = new Daily();
        // this.statusId.id=daily.shiftFrom;
        this.statusId.id=11;
        this.statusId.id=11;
    }
}