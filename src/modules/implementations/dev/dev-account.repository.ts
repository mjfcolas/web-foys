import {AccountRepository} from "@repositories/account.repository";
import {PgIdentifier} from "@repositories/models/pg-identifier";
import {Observable, of} from "rxjs";
import {History, HistoryLine} from "@repositories/models/history";
import {DateTime} from "luxon";
import {Cart} from "@repositories/models/cart";

export class DevAccountRepository implements AccountRepository {

    history(pg: PgIdentifier): Observable<History> {
        const result = new History({
            lines: [
                new HistoryLine({
                    product: {
                        name: "Bière belge",
                        price: 1.2
                    },
                    quantity: 2,
                    date: DateTime.utc(2022, 9, 6, 22, 15, 2)
                }),
                new HistoryLine({
                    product: {
                        name: "Alcool fort",
                        price: 0.5
                    },
                    quantity: 10,
                    date: DateTime.utc(2022, 9, 6, 23, 15, 2)
                }),
                new HistoryLine({
                    product: {
                        name: "Blanche",
                        price: 1
                    },
                    quantity: 1,
                    date: DateTime.utc(2022, 9, 7, 2, 15, 2)
                })
            ]
        })
        return of(result);
    }

    save(cart: Cart): void {
    }

}
