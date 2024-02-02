import {createEffect, createStore} from "effector";
import {gql} from "@apollo/client";
import {client} from "../graphql";

type chatModel = {
    id: number;
    phone: string;
    firstName: string;
    lastName: string;
    avatar: string;
    lastMessage: string;
    dateTime: string;
}
export const $chats = createStore<{chats:chatModel[]}>({
    chats: []
})

export const AddChatFx = createEffect(async ({guest}: {guest: string} ) => {
    const QUERY = gql`
    mutation AddChatHandler($sender: String!, $receiver: String!){
        addChatHandler(chatInput: {sender: $sender, receiver: $receiver}){
            id
        }
    }`;
    let phone;
    if(localStorage.getItem("user")){
        // @ts-ignore
        phone = JSON.parse(localStorage.getItem("user")).phone;
    }

    let sender;
    let receiver;
    if(phone > guest){
        sender = phone;
        receiver = guest;
    } else{
        sender = guest;
        receiver = phone;
    }

    await client.mutate({
        mutation: QUERY,
        variables: {
            sender,
            receiver
        }
    })

})
export const GetChatsFx = createEffect(async () => {
    let phone;

    if(localStorage.getItem("user")){
        // @ts-ignore
        phone = JSON.parse(localStorage.getItem("user")).phone;
    }
    const QUERY = gql`
    query GetChatsHandler($phone: String!){
        getChatsHandler(phone: $phone){
            id
            user{
                phone
                firstName
                lastName
                avatar
            }
            lastMessage
            dateTime
        }
    }
    `;

    const {data} = await client.query({
        query: QUERY,
        variables: {
            phone
        }
    });

    return data.getChatsHandler;
})
export const UpdateChatFx = createEffect(async ({chats, message, datetime, chatId}: {chats: chatModel[], message: string, datetime: string, chatId: number}) => {
    return chats.map(chat => {
        if(chat.id == chatId){
            console.log(chat);
            chat.lastMessage = message;
            chat.dateTime = datetime;
        }
        return chat;
    })
})

$chats.on(GetChatsFx.doneData, (state, payload: {id:number, user: chatModel, lastMessage: string, dateTime:string}[]) => {
    return {
        ...state,
        chats: [...payload.map(el => {
            return {
                id: el.id,
                phone: el.user.phone,
                firstName: el.user.firstName,
                lastName: el.user.lastName,
                avatar: el.user.avatar,
                lastMessage: el.lastMessage,
                dateTime: el.dateTime
            }
        })]
    };
})
.on(UpdateChatFx.doneData, (state, payload) => {
    return {
        ...state,
        chats: [...payload]
    };
})