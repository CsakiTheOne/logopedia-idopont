import { DocumentData } from "firebase/firestore";

export default class Work {
    title: string;
    description: string;
    durationMinutes: number;

    constructor(title: string, description: string = '', durationMinutes: number = 0) {
        this.title = title;
        this.description = description;
        this.durationMinutes = durationMinutes;
    }

    static fromDocumentData(data: DocumentData): Work {
        return new Work(data.title, data.description, data.durationMinutes);
    }
}