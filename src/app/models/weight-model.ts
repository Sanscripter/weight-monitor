export class WeightModel {

    $key: string;
    public user: string;
    public value: number;
    public date: Date;
    public active: boolean;

    public setDate(date = null) {
        if (date) {
            this.date = date;
            return;
        }
        this.date = new Date();
    }
}
