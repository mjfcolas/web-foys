import {PgIdentifier} from "./models/pg-identifier";
import {Observable} from "rxjs";
import {History} from "./models/history";
import {Cart} from "./models/cart";

export abstract class AccountRepository {
    abstract history(pg: PgIdentifier): Observable<History>
    abstract save(cart: Cart, pg: PgIdentifier): void;
}
