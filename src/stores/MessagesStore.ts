import {createStore, createEffect} from "effector";
import {gql} from "@apollo/client";
import {client} from "../graphql";


type Message = {
    id: number;
    text: string;
    attach: string;
    datetime: string;
    isSent: boolean;
    checked: boolean;
}
type User = {
    phone: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

export const $messages = createStore<{messages: Message[], targetUser: User, isSender: boolean}>({
    targetUser: {
        phone: "",
        firstName: "",
        lastName: "",
        avatar: ''
    },
    messages: [],
    isSender: false
})
export const GetMessagesFx = createEffect(async (id: number) => {
    const QUERY = gql`
    query GetChatHandler($id: Int!){
        getChatHandler(id: $id){
            sender {
                user {
                   phone
                   avatar
                   firstName
                   lastName 
                }
            }
            receiver {
                user {
                   phone
                   avatar
                   firstName
                   lastName 
                }
            }
            messages {
                id
                text
                attach
                datetime
                isSent
                checked
            }
        }
    }`;
    const {data} = await client.query({
        query: QUERY,
        variables: {
            id
        }
    })
    return data.getChatHandler;
})
export const AddMessageFx = createEffect(async ({text, chat, isSent}:{text:string, chat:number, isSent:boolean}) => {
    const datetime = (new Date()).toISOString().split("T").join(" ").slice(0, 19);
    const QUERY = gql`
    mutation AddMessageHandler($text: String!, $attach: String, $chat: Int!, $datetime:String!, $isSent: Boolean!){
        addMessageHandler(messageInput: {text: $text, attach: $attach, chat: $chat, datetime: $datetime, isSent:$isSent}){
            id
            text
            attach
            datetime
            isSent
            checked
        }
    }`
    const {data} = await client.mutate({
        mutation: QUERY,
        variables: {
            text,
            attach: null,
            chat,
            datetime,
            isSent
        }
    })
    return data.addMessageHandler;
})
export const CheckMessageFx = createEffect(async ({chat, isSender}:{chat:number, isSender:boolean}) => {
    const QUERY = gql`
    mutation CheckMessagesHandler($chat: Int!, $isSender: Boolean!){
        checkMessagesHandler(phonesInput:{chat: $chat, isSender: $isSender}){
            id
            text
            attach
            datetime
            isSent
            checked
        }   
    }`;
    const {data} = await client.mutate({
        mutation: QUERY,
        variables: {
            chat,
            isSender
        }
    })
    return data.checkMessagesHandler;
})
export const UpdateMessagesFx = createEffect(async ({message}:{message: Message}) => {
    return message;
})
$messages.on(GetMessagesFx.doneData, (state, payload:{messages:Message[], receiver: {user: User}, sender: {user: User}}) => {
    // @ts-ignore
    const phone = JSON.parse(localStorage.getItem("user")).phone;
    if(payload.sender.user.phone === phone){
        return {...state, messages: [...(payload.messages || [])], targetUser: {...payload.receiver.user}, isSender: true};
    }
    if(payload.receiver.user.phone === phone){

        return {...state, messages: [...(payload.messages || [])], targetUser: {...payload.sender.user}, isSender: false};
    }
    return state;

})
.on(AddMessageFx.doneData, (state, payload:Message) => {
    return {...state, messages: [...state.messages]};
})
.on(CheckMessageFx.doneData, (state, payload:Message[]) => {
    return {...state, messages: [...payload]};
})
.on(UpdateMessagesFx.doneData, (state, payload:Message) => {
    console.log(payload);
    return {...state, messages: [...state.messages, payload]};
})