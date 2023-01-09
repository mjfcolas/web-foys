import {Observable} from "rxjs";
import {PgIdentifier} from "./models/pg-identifier";

export abstract class LoginRepository {
    abstract currentLoggedInUser(): Observable<PgIdentifier | undefined>

    abstract login(pg: PgIdentifier): void;
    abstract logout(): void;
}
