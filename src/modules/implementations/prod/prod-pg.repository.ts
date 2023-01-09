import {PgRepository} from "@repositories/pg.repository";
import {from, map, mergeMap, Observable, of, switchMap} from "rxjs";
import {PromsWithKey} from "@repositories/models/proms-with-key";
import {Pg} from "modules/repository/models/pg";
import {PgIdentifier} from "modules/repository/models/pg-identifier";
import {AccountRepository} from "@repositories/account.repository";
import {FunctionKey} from "@repositories/models/function-key";


export class ProdPgRepository implements PgRepository {

    constructor(private readonly accountRepository: AccountRepository) {
    }

    get(pgIdentifier: PgIdentifier): Observable<Pg | undefined> {
        return from(fetch(`${process.env.PUBLIC_URL}/confs/pgs.json`))
            .pipe((switchMap(response => response.json())), mergeMap((pgs: Pg[]) => {
                const pg = pgs.find(pg =>
                    pg.id.proms.year === pgIdentifier.proms.year
                    && pg.id.proms.tabagns === pgIdentifier.proms.tabagns
                    && pg.id.nums === pgIdentifier.nums)
                if (!pg)
                    return of(undefined);

                return this.accountRepository.history(pgIdentifier).pipe(map(history => ({
                    ...pg,
                    history: history
                })));
            }));
    }

    listProms(): Observable<readonly PromsWithKey[]> {
        return from(fetch(`${process.env.PUBLIC_URL}/confs/pgs.json`))
            .pipe((switchMap(response => response.json())), map((pgs: Pg[]) => {
                const distinctProms: PromsWithKey[]
                    = pgs.map(pg => pg.id.proms)
                    .filter((value, index, array) => array
                        .findIndex(potentialDuplicate =>
                            potentialDuplicate.year === value.year
                            && potentialDuplicate.tabagns === value.tabagns) === index)
                    .map((proms, index) => ({
                        proms: proms,
                        key: `F${index + 1}` as FunctionKey
                    }));

                return distinctProms
            }));
    }
}
