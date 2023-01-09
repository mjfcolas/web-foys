import React, {FunctionComponent, useEffect, useState} from 'react';
import './App.css';
import {Subscription} from "rxjs";
import Login from "./Login";
import {loginRepository} from "../../configuration/configuration";
import {PgIdentifier} from "../repository/models/pg-identifier";
import Command from "./Command";

const App: FunctionComponent = () => {

    const [
        loggedInUser,
        setLoggedInUser
    ] = useState<PgIdentifier | undefined>(undefined);

    useEffect(() => {
        const subscription: Subscription = loginRepository
            .currentLoggedInUser()
            .subscribe(newLoggedInUser => setLoggedInUser(newLoggedInUser))
        return subscription.unsubscribe
    }, []);


    if (loggedInUser) {
        return (
            <div className="app">
                <Command/>
            </div>
        )
    } else {
        return (
            <div className="app">
                <Login/>
            </div>
        )
    }
}

export default App;
