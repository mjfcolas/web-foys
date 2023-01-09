import React, {FunctionComponent, useEffect, useState} from 'react';
import './Command.css';
import logo from "../../assets/zaloeiln.png";
import {Pg} from "../repository/models/pg";
import {accountRepository, loginRepository, pgRepository, productsRepository} from "configuration/configuration";
import {mergeMap, of, Subscription} from "rxjs";
import {ProductWithKey} from "../repository/models/product-with-key";
import {Product} from "../repository/models/product";
import {Cart} from "../repository/models/cart";

const Command: FunctionComponent = () => {

    const [
        pg,
        setPg
    ] = useState<Pg | undefined>(undefined)

    const [
        shortcuts,
        setShortcuts
    ] = useState<readonly ProductWithKey[]>([])

    const [
        products,
        setProducts
    ] = useState<readonly Product[]>([])

    const [
        selectedProductIndex,
        setSelectecProductIndex
    ] = useState<number>(0)

    const [
        cart,
        setCart
    ] = useState<Cart>(Cart.empty)

    useEffect(() => {
        productsRepository.shortcuts().subscribe(shortcuts => setShortcuts(shortcuts))
    }, [])

    useEffect(() => {
        productsRepository.list().subscribe(products => setProducts(products))
    }, [])

    useEffect(() => {
        const subscription: Subscription = loginRepository
            .currentLoggedInUser()
            .pipe(mergeMap(pgIdentifier => pgIdentifier ? pgRepository.get(pgIdentifier) : of(undefined)))
            .subscribe(pg => setPg(pg))
        return subscription.unsubscribe
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if ('Escape' !== event.key) {
                return;
            }
            event.preventDefault()
            if (window.confirm("Veux-tu annuler la commande?")) {
                loginRepository.logout()
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [])

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (!['ArrowDown', "ArrowUp"].some(value => value === event.key)) {
                return;
            }
            event.preventDefault()
            let newSelectProductIndex = selectedProductIndex
            if (event.key === "ArrowUp") {
                newSelectProductIndex -= 1;

            }
            if (event.key === "ArrowDown") {
                newSelectProductIndex += 1;

            }
            if (newSelectProductIndex >= products.length) {
                newSelectProductIndex = 0;
            }
            if (newSelectProductIndex < 0) {
                newSelectProductIndex = products.length - 1;
            }
            setSelectecProductIndex(newSelectProductIndex)

        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [products, selectedProductIndex])

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key !== " ") {
                return;
            }
            event.preventDefault()
            setCart(cart.add(products[selectedProductIndex]))

        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [cart, products, selectedProductIndex])

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            const watchedKeys = shortcuts.map(productWithKey => productWithKey.key);
            if (!watchedKeys.some((key) => key === event.key)) {
                return;
            }
            event.preventDefault()

            const productWithKey = shortcuts.find(current => current.key === event.key);
            if (!productWithKey) {
                return;
            }
            setCart(cart.add(productWithKey.product))
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [cart, shortcuts])

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            const watchedKeys = shortcuts.map(productWithKey => productWithKey.key);
            if (!watchedKeys.some((key) => key === event.key)) {
                return;
            }
            event.preventDefault()

            const productWithKey = shortcuts.find(current => current.key === event.key);
            if (!productWithKey) {
                return;
            }
            setCart(cart.add(productWithKey.product))
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [cart, shortcuts])

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key !== "Enter") {
                return;
            }
            event.preventDefault()
            if (!cart.isEmpty() && pg) {
                accountRepository.save(cart, pg.id)
                alert("Commande enregistrée")
            }
            loginRepository.logout();

        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [cart, pg])


    return (
        <div className="command">
            <div className="left">
                <table className="product-table">
                    <thead>
                    <tr>
                        <th className="name">Produits</th>
                        <th className="price">Prix</th>
                        <th className="quantity">Q</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products
                        .map((product, index) =>
                            <tr className={`${index === selectedProductIndex ? "--active" : ""}`} key={index}>
                                <td className="name">{product.name}</td>
                                <td className="price">{product.price.toFixed(2)}</td>
                                <td className="quantity">{cart.quantityOf(product.name)}</td>
                            </tr>
                        )}
                    {[...Array(100).keys()].map(value => <tr key={value}>
                        <td className="name"></td>
                        <td className="price"></td>
                        <td className="quantity"></td>
                    </tr>)}
                    </tbody>
                </table>

            </div>
            <div className="center">
                <div className="account">
                    <div className="account-amount">
                        {((pg?.history.amount() ?? 0) * -1).toFixed(2)}
                    </div>
                    <div className="command-amount --big">
                        {cart.price().toFixed(2)}
                    </div>
                </div>
                <div className="am-zaloeil">
                    <img alt="AM Logo" src={logo}/>
                </div>
                <div className="bottom">
                    <div className="shortcuts --medium">
                        {shortcuts
                            .map((productWithKey) =>
                                <div className="product-shortcut" key={productWithKey.key}>
                                    {productWithKey.key} : {productWithKey.product.name}
                                </div>
                            )}
                    </div>
                    <div className="pg-information --big">
                        <div className="nums">
                            {pg?.id.nums}{pg?.id.proms.tabagns}{pg?.id.proms.year}
                        </div>
                        <div className="buque">
                            {pg?.name}
                        </div>
                    </div>
                </div>
            </div>
            <div className="right">
                <table className="history-table">
                    <thead>
                    <tr>
                        <th className="date">Date</th>
                        <th className="product">Produits</th>
                        <th className="quantity">Q</th>
                        <th className="price">Prix</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pg?.history.lines
                        .map((line, index) =>
                            <tr key={index}>
                                <td className="date">{line.formatedDate()}</td>
                                <td className="product">{line.product.name}</td>
                                <td className="quantity">{line.quantity}</td>
                                <td className="price">{line.price().toFixed(2)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Command;
