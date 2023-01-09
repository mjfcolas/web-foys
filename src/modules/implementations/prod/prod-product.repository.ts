import {ProductsRepository} from "@repositories/products.repository";
import {from, Observable, switchMap} from "rxjs";
import {ProductWithKey} from "@repositories/models/product-with-key";

import {Product} from "@repositories/models/product";


export class ProdProductRepository implements ProductsRepository {

    list(): Observable<readonly Product[]> {
        return from(fetch(`${process.env.PUBLIC_URL}/confs/products.json`))
            .pipe((switchMap(response => response.json())))
    }

    shortcuts(): Observable<readonly ProductWithKey[]> {
        return from(fetch(`${process.env.PUBLIC_URL}/confs/shortcuts.json`))
            .pipe((switchMap(response => response.json())))
    }
}
