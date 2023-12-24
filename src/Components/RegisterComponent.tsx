import React from 'react';
import styles from './styles/RegisterStyles.module.css';

const RegisterComponent = () => {
    return (
        <section className={styles.container}>
            <form className={styles.form}>
                <h2 className={styles.caption}>Register</h2>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" placeholder="type your phone"/>
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name" placeholder="type your first name"/>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="type your last name"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="type your password"/>
                <button className={styles.button}>Register</button>

            </form>
        </section>
    );
};

export default RegisterComponent;