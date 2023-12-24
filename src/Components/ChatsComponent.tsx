import React from 'react';
import styles from "./styles/ChatsStyles.module.css";
import ChatComponent from "./ChatComponent";

const ChatsComponent = () => {
    return (
        <section>
            <ChatComponent/>
            <ChatComponent/>
            <ChatComponent/>
        </section>
    );
};

export default ChatsComponent;