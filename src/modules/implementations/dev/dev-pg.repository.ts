import {PgRepository} from "@repositories/pg.repository";
import {map, Observable, of} from "rxjs";
import {PromsWithKey} from "@repositories/models/proms-with-key";
import {Pg} from "modules/repository/models/pg";
import {PgIdentifier} from "modules/repository/models/pg-identifier";
import {AccountRepository} from "@repositories/account.repository";

export class DevPgRepository implements PgRepository {

    constructor(private readonly accountRepository: AccountRepository) {
    }

    get(pg: PgIdentifier): Observable<Pg | undefined> {
        if (pg.nums !== "80")
            return of(undefined);

        return this.accountRepository.history(pg).pipe(map(history => ({
            id: {
                nums: "80",
                proms: {
                    tabagns: "Li",
                    year: 212
                }
            },
            name: "PG 1",
            history: history
        })));
    }

    listProms(): Observable<readonly PromsWithKey[]> {
        return of([
            {
                proms: {
                    tabagns: "Li",
                    year: 211
                },
                key: "F1"
            },
            {
                proms: {
                    tabagns: "Li",
                    year: 212
                },
                key: "F2"
            },
            {
                proms: {
                    tabagns: "Li",
                    year: 213
                },
                key: "F3"
            },
            {
                proms: {
                    tabagns: "Li",
                    year: 214
                },
                key: "F4"
            }
        ]);
    }
}
