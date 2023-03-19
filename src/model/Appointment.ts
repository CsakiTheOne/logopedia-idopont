export default class Appointment {
    id: string;
    username: string;
    workTitle: string;
    date: string;
    startTime: string;
    
    constructor(id: string, username: string, workTitle: string, date: string, startTime: string) {
        this.id = id;
        this.username = username;
        this.workTitle = workTitle;
        this.date = date;
        this.startTime = startTime;
    }
}