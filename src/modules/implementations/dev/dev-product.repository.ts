import {ProductsRepository} from "@repositories/products.repository";
import {Observable, of} from "rxjs";
import {Product} from "@repositories/models/product";
import {ProductWithKey} from "@repositories/models/product-with-key";

export class DevProductRepository implements ProductsRepository {
    list(): Observable<readonly Product[]> {
        const result: readonly Product[] = [
            {
                name: "Bière belge",
                price: 1.2
            },
            {
                name: "Alcool fort",
                price: 0.5
            },
            {
                name: "Blanche",
                price: 1
            }
        ];
        return of(result);
    }

    shortcuts(): Observable<readonly ProductWithKey[]> {
        const result: readonly ProductWithKey[] = [
            {
                key: "F1",
                product: {
                    name: "Bière belge",
                    price: 1.2
                },
            },
            {
                key: "F2",
                product: {
                    name: "Alcool fort",
                    price: 0.5
                },
            },
            {
                key: "F3",
                product: {
                    name: "Blanche",
                    price: 1
                },
            }
        ];
        return of(result);
    }
}
