import {PgIdentifier} from "./pg-identifier";
import {History} from "./history";

export type Pg = {
    id: PgIdentifier,
    name: string,
    history: History
}
