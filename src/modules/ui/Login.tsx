import React, {FunctionComponent, useEffect, useState} from 'react';
import './Login.css';
import {loginRepository, pgRepository} from "../../configuration/configuration";
import logo from '../../assets/zaloeiln.png';
import {PromsWithKey} from "../repository/models/proms-with-key";
import {Pg} from "../repository/models/pg";
import {delay, of} from "rxjs";

const Login: FunctionComponent = () => {

    const [
        nums,
        setNums
    ] = useState<string>("");

    const [
        promsWityKeyList,
        setPromsWityKeyList
    ] = useState<readonly PromsWithKey[]>([])

    const [
        loginOccurs,
        setLoginOccurs
    ] = useState<string>("")

    useEffect(() => {
        pgRepository.listProms().subscribe(proms => setPromsWityKeyList(proms))
    }, [])

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            document.getElementById("nums-input")?.focus()
            const watchedKeys = promsWityKeyList.map(proms => proms.key);
            if (!watchedKeys.some((key) => key === event.key)) {
                return;
            }
            event.preventDefault()

            const promsWithKey = promsWityKeyList.find(promsWithKey => promsWithKey.key === event.key);
            if (!promsWithKey) {
                return;
            }
            const loginIdentifier = {
                nums: nums,
                proms: promsWithKey.proms
            };
            pgRepository.get(loginIdentifier).subscribe((pg: Pg | undefined) => {
                if (pg) {
                    setLoginOccurs(pg.name);
                    of(null).pipe(delay(1000)).subscribe(_ => loginRepository.login(loginIdentifier))
                } else {
                    setNums("")
                }
            })
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [promsWityKeyList, nums])


    return (
        <div className="login">
            {loginOccurs &&
                <div className="big-buque">
                    {loginOccurs}
                </div>
            }

            <div className="login-input">
                <input type={"text"} value={nums}
                       autoComplete={"off"}
                       id="nums-input"
                       onChange={(e) => setNums(e.target.value)}
                       className={"login-element"}/>
            </div>
            <div className="am-zaloeil">
                <img alt="AM logo" src={logo}/>
            </div>
            <div className="proms-list">
                <div className="proms-list-left">
                    {promsWityKeyList
                        .filter((_, index) => index + 1 <= promsWityKeyList.length / 2)
                        .map((promsWithKey) =>
                            <div className="proms --big" key={`${promsWithKey.key}`}>
                                {promsWithKey.key}:{promsWithKey.proms.tabagns}{promsWithKey.proms.year}
                            </div>
                        )}
                </div>
                <div className="proms-list-right">
                    {promsWityKeyList
                        .filter((_, index) => index + 1 > promsWityKeyList.length / 2)
                        .map((promsWithKey) =>
                            <div className="proms --big" key={`${promsWithKey.key}`}>
                                {promsWithKey.key}:{promsWithKey.proms.tabagns}{promsWithKey.proms.year}
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Login;
