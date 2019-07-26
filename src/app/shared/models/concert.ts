export class Concert {
    public id: number;
    public date: Date;
    public name: string;
    public location: string;
    public playerNumber: string;
    public spectatorNumber: string;
    public length: string;
    public sheets: ConcertSheets[];
}

export class ConcertSheets {
    public id: number;
    public title: string;
}
