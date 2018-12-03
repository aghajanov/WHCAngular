import { Status } from "./statuses";

export class DailyChange {
    id:number;
    statusId: Status;
    agentTo: string;
    shiftFrom: number;
    shiftTo: number;

    /**
     *
     */
    constructor() {
        this.statusId=new Status();
        this.statusId.id=11;
        this.statusId.id=11;
    }
}