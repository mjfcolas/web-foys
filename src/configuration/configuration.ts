import {ProdLoginRepository} from "@implementations/prod/prod-login.repository";
import {ProdAccountRepository} from "@implementations/prod/prod-account.repository";
import {ProdProductRepository} from "@implementations/prod/prod-product.repository";
import {ProdPgRepository} from "@implementations/prod/prod-pg.repository";

export const accountRepository = new ProdAccountRepository();
export const pgRepository = new ProdPgRepository(accountRepository);
export const loginRepository = new ProdLoginRepository();
export const productsRepository = new ProdProductRepository();
