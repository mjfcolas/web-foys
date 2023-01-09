import {LoginRepository} from "@repositories/login.repository";
import {BehaviorSubject, Observable} from "rxjs";
import {PgIdentifier} from "@repositories/models/pg-identifier";

export class ProdLoginRepository implements LoginRepository {
    private loggedInUserSubject: BehaviorSubject<PgIdentifier | undefined> = new BehaviorSubject<PgIdentifier | undefined>(undefined)

    currentLoggedInUser(): Observable<PgIdentifier | undefined> {
        return this.loggedInUserSubject
    }

    login(pg: PgIdentifier): void {
        this.loggedInUserSubject.next(pg);
    }

    logout(): void {
        this.loggedInUserSubject.next(undefined)
    }

}
