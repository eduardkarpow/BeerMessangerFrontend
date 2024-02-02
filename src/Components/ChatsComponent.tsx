import React, {useEffect, useState} from 'react';
import styles from "./styles/ChatsStyles.module.css";
import ChatComponent from "./ChatComponent";
import {useUnit} from "effector-react";
import {$chats, AddChatFx, GetChatsFx, UpdateChatFx} from "../stores/ChatsStore";
import {gql, useSubscription} from "@apollo/client";
import {client} from "../graphql";

const ChatsComponent = () => {

    const [modalIsOpened, setModalIsOpened] = useState<Boolean>(true);
    const [phone, setPhone] = useState<string>('');

    const [addChatFx, getChatsFx, updateChatFx, chats] = useUnit([AddChatFx, GetChatsFx, UpdateChatFx, $chats]);

    const QUERY = gql`
        subscription GetMessages {
            messages{
                text
                datetime
                chat {
                    id
                }
            }
        }
    `


    useEffect( () => {
        getChatsFx();
    }, [])

    const addChat = async () => {
        await addChatFx({guest: phone});
    }

    useSubscription(QUERY, {
        onSubscriptionData: async (data) => {
            const dat = data.subscriptionData.data.messages;
            console.log(dat);
            await updateChatFx({
                chats: chats.chats,
                chatId: dat.chat.id,
                message: dat.text,
                datetime: dat.datetime
            })
        }
    });

    return (
        <section className={styles.section}>
            {chats.chats.map(chat => <ChatComponent key={chat.phone} {...chat}/>)}


            <button className={styles.add} onClick={() => setModalIsOpened(!modalIsOpened)}>
                +
            </button>
            {modalIsOpened ? <div className={styles.modal}>
                <label htmlFor="Phone">Phone</label>
                <input type="text" id="Phone"
                       placeholder="type your phone" className={styles.input}
                       value={phone} onChange={e => setPhone(e.target.value)}
                />
                <button className={styles.button} onClick={addChat}>ADD</button>
            </div> : null}

        </section>
    );
};

export default ChatsComponent;