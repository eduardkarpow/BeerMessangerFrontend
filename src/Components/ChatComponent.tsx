import React from 'react';
import styles from "./styles/ChatsStyles.module.css";
import {ChatPropsModel} from "../models/ChatPropsModel";
import {STATIC_URL} from "../graphql";
import {NavLink} from "react-router-dom";
const ChatComponent = (props:ChatPropsModel) => {
    return (
        <NavLink to={`/chat/${props.id}`} className={styles.chat}>
            <div className={styles.main}>
                <div className={styles.image}><img src={STATIC_URL + (props.avatar || "images/+79991119978.jpg")} alt=""/></div>
                <div className={styles.info}>
                    <div className={styles.name}>{`${props.firstName} ${props.lastName}`}</div>
                    <div className={styles.last_message}>{props.lastMessage}</div>
                </div>
            </div>
            <div className={styles.date}>{props.dateTime.slice(5,10)}</div>
        </NavLink>
    );
};

export default ChatComponent;