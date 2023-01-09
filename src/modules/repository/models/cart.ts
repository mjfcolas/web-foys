import {Product} from "./product";
import {HistoryLine} from "./history";
import {DateTime} from "luxon";

export class Cart {

    private constructor(public readonly products: Product[]) {
    }

    static empty() {
        return new Cart([])
    }

    add(product: Product) {
        if (!product) {
            console.error("Product added in cart must be defined")
            return this;
        }
        return new Cart([...this.products, product])
    }

    quantityOf(productName: string) {
        return this.products.filter(product => product.name === productName).length
    }

    toHistoryLines(): HistoryLine[] {
        const now = DateTime.now()
        const quantitiesByProduct: Map<string, number> = new Map();

        this.products.forEach(product => {
            const stringifyProduct = JSON.stringify(product)
            if (!quantitiesByProduct.has(stringifyProduct)) {
                quantitiesByProduct.set(stringifyProduct, 0);
            }
            quantitiesByProduct.set(stringifyProduct, (quantitiesByProduct.get(stringifyProduct) ?? 0) + 1)
        })

        const result: HistoryLine[] = []

        quantitiesByProduct.forEach((quantity, stringifyProduct) => {
            result.push(new HistoryLine({
                product: JSON.parse(stringifyProduct),
                date: now,
                quantity: quantity
            }))
        })
        return result;
    }

    price() {
        return this.products.map(value => value.price).reduce((a, b) => a + b, 0)
    }

    isEmpty() {
        return this.products.length === 0;
    }
}
