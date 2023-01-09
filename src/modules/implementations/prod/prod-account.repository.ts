import {AccountRepository} from "@repositories/account.repository";
import {PgIdentifier} from "@repositories/models/pg-identifier";
import {Observable, of} from "rxjs";
import {History, HistoryLine} from "@repositories/models/history";
import {Cart} from "@repositories/models/cart";
import {DateTime} from "luxon";
import {Product} from "@repositories/models/product";

export class ProdAccountRepository implements AccountRepository {


    history(pg: PgIdentifier): Observable<History> {
        const rawStoredLines: {
            date: string
            product: Product,
            quantity: number
        }[] = JSON.parse(localStorage.getItem(localStorageKeyForPg(pg)) || "[]");
        const historyLines = rawStoredLines.map((rawLine) => new HistoryLine({
            date: DateTime.fromISO(rawLine.date),
            quantity: rawLine.quantity,
            product: rawLine.product
        }))

        const sortedHistoryLines = historyLines.sort((a, b) => b.date.valueOf() - a.date.valueOf())
        return of(new History({
            lines: sortedHistoryLines
        }));
    }

    save(cart: Cart, pg: PgIdentifier): void {
        const newHistoryLines = cart.toHistoryLines();
        this.history(pg).subscribe((oldHistory: History) => {
            const newLines = [...oldHistory.lines, ...newHistoryLines]
            localStorage.setItem(localStorageKeyForPg(pg), JSON.stringify(newLines))
        })
    }

}

const localStorageKeyForPg = (pgIdentifier: PgIdentifier) => `account-${pgIdentifier.nums}${pgIdentifier.proms.tabagns}${pgIdentifier.proms.year}`
