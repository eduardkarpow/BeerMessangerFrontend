import React, {useRef, useState} from 'react';
import styles from './styles/RegisterStyles.module.css';
import {RegisterUserFx, UploadAvatarFx} from "../stores/UserStore";
import {useUnit} from "effector-react";
import {NavLink} from "react-router-dom";

const RegisterComponent = () => {

    const [phone, setPhone] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [selected, setSelected] = useState<File>(new File([], "das"));

    const filePicker = useRef(null);
    const [registerUserFx, uploadAvatarFx] = useUnit([RegisterUserFx, UploadAvatarFx]);

    const register = async (e:any) => {
        await setTimeout(async () => {
            const formData = new FormData();
            formData.append("phone", phone);
            if(selected){
                // @ts-ignore
                formData.append("avatar", selected);
                formData.append("isUploaded", "true");
            } else{
                formData.append("isUploaded", "false");
            }

            await registerUserFx({phone, firstName, lastName, password, avatar: ''});
            await uploadAvatarFx(formData);
        }, 1000)

    }

    return (
        <section className={styles.container}>
            <form className={styles.form}>
                <h2 className={styles.caption}>Register</h2>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone"
                       placeholder="type your phone"
                       value={phone} onChange={e => setPhone(e.target.value)}
                />
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name"
                       placeholder="type your first name"
                       value={firstName} onChange={e => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName"
                       placeholder="type your last name"
                       value={lastName} onChange={e => setLastName(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                       placeholder="type your password"
                       value={password} onChange={e => setPassword(e.target.value)}
                />
                <input type="file" accept="image/*" ref={filePicker} onChange={() => {
                    // @ts-ignore
                    return setSelected(filePicker.current.files[0]);
                }
                }/>
                <NavLink to={"/chats"} className={styles.button} onClick={register}>Register</NavLink>

            </form>
        </section>
    );
};

export default RegisterComponent;