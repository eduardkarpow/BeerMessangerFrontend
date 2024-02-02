import React, {useEffect, useState} from 'react';
import styles from "./styles/MessagesStyles.module.css";
import {useUnit} from "effector-react";
import {$messages, AddMessageFx, CheckMessageFx, GetMessagesFx, UpdateMessagesFx} from "../stores/MessagesStore";
import {STATIC_URL} from "../graphql";
import {useParams} from "react-router-dom";
import {gql, useSubscription} from "@apollo/client";
const MessagesComponent = () => {

    const params = useParams();
    const [text, setText] = useState<string>("");
    const [addMessageFx, getMessagesFx, checkMessageFx, updateMessagesFx, messages] = useUnit([AddMessageFx, GetMessagesFx, CheckMessageFx, UpdateMessagesFx, $messages]);

    useEffect(() => {

        getMessagesFx(Number(params.id))
            .then(_ => checkMessageFx({chat: Number(params.id), isSender: messages.isSender}));

        
    }, [])

    const QUERY = gql`
        subscription GetMessages {
            messages{
                id
                text
                attach
                datetime
                isSent
                checked
            }
        }
    `
    useSubscription(QUERY, {
        onSubscriptionData: async (data) => {
            const dat = data.subscriptionData.data.messages;
            console.log(dat);
            await updateMessagesFx({message: {
              id: Number(dat.id),
              text: dat.text,
              attach: dat.attach,
              datetime: dat.datetime,
              isSent: dat.isSent,
              checked: dat.checked
            }});
        }
    });
    const send = async () => {
        await addMessageFx({text, isSent: messages.isSender, chat: Number(params.id)});
    }

    return (
        <div>
            <div className={styles.mainInfo}>
                <div className={styles.image}><img src={STATIC_URL+(messages.targetUser.avatar || "/images/+79991119978.jpg")} alt=""/></div>
                <div className={styles.name}>{`${messages.targetUser.firstName} ${messages.targetUser.lastName}`}</div>
            </div>
            <div className={styles.messagesContainer}>
                {messages.messages.map(message => {
                    let style;
                    if((messages.isSender && message.isSent) || (!messages.isSender && !message.isSent)) {
                        style = styles.my;
                    } else {
                        style = styles.yours;
                    }
                    return <div className={styles.message + " " + style} key={message.datetime}>{message.text}</div>
                })}
            </div>
            <div className={styles.form}>
                <textarea name="message" className={styles.text}
                          onChange={(e:any) => setText(e.target.value)} value={text}></textarea>
                <button className={styles.button} onClick={send}><div>{">"}</div></button>
            </div>
        </div>
    );
};

export default MessagesComponent;