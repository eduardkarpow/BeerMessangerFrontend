import React, {useState} from 'react';
import styles from './styles/RegisterStyles.module.css';
import {LoginUserFx} from "../stores/UserStore";
import {useUnit} from "effector-react";
import {NavLink} from "react-router-dom";

const LoginComponent = () => {

    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginUserFx] = useUnit([LoginUserFx]);

    const login = async (e:any) => {
        await loginUserFx({phone, password});
    }

    return (
        <section className={styles.container}>
            <form className={styles.form}>
                <h2 className={styles.caption}>Login</h2>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone"
                       placeholder="type your phone"
                       value={phone} onChange={e => setPhone(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                       placeholder="type your password"
                       value={password} onChange={e => setPassword(e.target.value)}
                />
                <NavLink to = "/chats" className={styles.button} onClick={login}>Login</NavLink>
            </form>
        </section>
    );
};

export default LoginComponent;