import {DateTime} from "luxon";
import {Product} from "./product";

export class History {
    public readonly lines: readonly HistoryLine[];

    constructor(params: { lines: HistoryLine[] }) {
        this.lines = params.lines
    }

    public amount(): number {
        return this.lines
            .map(historyLine => historyLine.price())
            .reduce((a, b) => a + b, 0)
    }
}

export class HistoryLine {
    public readonly date: DateTime;
    public readonly product: Product;
    public readonly quantity: number;

    constructor(params: {
        date: DateTime
        product: Product,
        quantity: number
    }) {
        this.date = params.date;
        this.product = params.product;
        this.quantity = params.quantity
    }

    public formatedDate(): string {
        return this.date.toFormat("dd/MM/yyyy hh:mm")
    }

    public price(): number{
        return this.quantity * this.product.price;
    }
}
