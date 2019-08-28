export class Concert {
    public id: number;
    public date: Date;
    public name: string;
    public location: string;
    public playerNumber: number;
    public spectatorNumber: number;
    public length: number;
    public sheets: ConcertSheets[];
}

export class ConcertSheets {
    public id: number;
    public title: string;
    public author: string;
}
