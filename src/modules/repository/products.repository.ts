import {Observable} from "rxjs";
import {Product} from "./models/product";
import {ProductWithKey} from "./models/product-with-key";

export abstract class ProductsRepository{
    abstract list(): Observable<readonly Product[]>
    abstract shortcuts(): Observable<readonly ProductWithKey[]>
}
