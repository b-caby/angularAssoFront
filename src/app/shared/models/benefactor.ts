import { Gift } from "./gift";

export class Benefactor {
    public id: number;
    public honorifics: string;
    public name: string;
    public firstname: string;
    public adress: string;
    public postalCode: string;
    public city: string;
    public phone: string;
    public mobile: string;
    public email: string;
    public gifts: Gift[];
}
