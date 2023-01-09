import {Observable} from "rxjs";
import {PromsWithKey} from "./models/proms-with-key";
import {PgIdentifier} from "./models/pg-identifier";
import {Pg} from "./models/pg";

export abstract class PgRepository {
    abstract listProms(): Observable<readonly PromsWithKey[]>;
    abstract get(pg: PgIdentifier): Observable<Pg | undefined>;
}
