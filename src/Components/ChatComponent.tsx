import React from 'react';
import styles from "./styles/ChatsStyles.module.css";
const ChatComponent = () => {
    return (
        <div className={styles.chat}>
            <div className={styles.main}>
                <div className={styles.image}><img src="https://postium.ru/wp-content/uploads/2023/06/shedevrum.jpg" alt=""/></div>
                <div className={styles.info}>
                    <div className={styles.name}>Тестовый пользователь</div>
                    <div className={styles.last_message}>Привет мир!!!</div>
                </div>
            </div>
            <div className={styles.date}>02.12.2023</div>
        </div>
    );
};

export default ChatComponent;