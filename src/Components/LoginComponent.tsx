import React from 'react';
import styles from './styles/RegisterStyles.module.css';

const LoginComponent = () => {
    return (
        <section className={styles.container}>
            <form className={styles.form}>
                <h2 className={styles.caption}>Login</h2>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" placeholder="type your phone"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="type your password"/>
                <button className={styles.button}>Login</button>

            </form>
        </section>
    );
};

export default LoginComponent;