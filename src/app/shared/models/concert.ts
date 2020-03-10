import { Sheet } from "./sheet";

export class Concert {
    public id: number;
    public date: Date;
    public name: string;
    public location: string;
    public playerNumber: number;
    public spectatorNumber: number;
    public length: number;
    public sheets: Sheet[];
}