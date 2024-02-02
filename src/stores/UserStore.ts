import {createEffect, createStore} from "effector";
import {ApolloQueryResult, gql, QueryResult, useQuery} from "@apollo/client";
import {client} from "../graphql";


type UserModel = {
    phone: string;
    firstName: string;
    lastName: string;
    password: string;
    avatar: string;
}

const $user = createStore<UserModel>({
    phone: "",
    firstName: "",
    lastName: "",
    password: "",
    avatar: ""
})
export const RegisterUserFx = createEffect(async ({phone, firstName, lastName, password, avatar}: UserModel):Promise<UserModel> => {
    const hashedPassword = password//await bcrypt.hash(password, phone);

    const QUERY = gql`
    mutation RegisterHandler($phone: ID!, $firstName: String!, $lastName: String!, $password: String!, $avatar: String!) {
        registerHandler(userInput: {
            phone: $phone,
            firstName: $firstName,
            lastName: $lastName,
            password: $password,
            avatar: $avatar
        }){
            phone,
            firstName,
            lastName,
            password
            avatar
        }
    }
    `;
    const CREATE_SENDER = gql`
    mutation AddSenderHandler($phone: String!){
        addSenderHandler(senderInput: {phone: $phone}){
            id
        }
    }
    `;
    const CREATE_RECEIVER = gql`
    mutation AddReceiverHandler($phone: String!){
        addReceiverHandler(receiverInput: {phone: $phone}){
            id
        }
    }
    `;

    const {data} = await client.mutate({
        mutation: QUERY,
        variables: {
            phone,
            firstName,
            lastName,
            password: hashedPassword,
            avatar
        }
    }
    );
    await client.mutate({
        mutation: CREATE_SENDER,
        variables: {
            phone
        }
    })
    await client.mutate({
        mutation: CREATE_RECEIVER,
        variables: {
            phone
        }
    })
    localStorage.setItem("user", JSON.stringify(data.registerHandler));
    return data.registerHandler;
})
export const LoginUserFx = createEffect(async ({phone, password}: {phone: string, password: string}) => {
    const QUERY = gql`
    mutation LoginHandler($phone: ID!, $password: String!) {
        loginHandler(loginInput: {
            phone: $phone,
            password: $password
        }){
            phone,
            firstName,
            lastName,
            password
            avatar
        }
    }
    `;
    const {data} = await client.mutate({
        mutation: QUERY,
        variables: {
            phone,
            password
        }
    });
    localStorage.setItem("user", JSON.stringify(data.loginHandler));
    return data.loginHandler;
})
export const UploadAvatarFx = createEffect(async (formData: FormData) => {
    const response = await fetch("http://localhost:8080/upload/avatar", {
        method: "POST",
        body: formData
    }).then(res => res.json());
    return response;
})
$user.on(RegisterUserFx.doneData, (state, user) => {
    return {
        ...state,
        ...user
    }
})
.on(LoginUserFx.doneData, (state, user) => {
    console.log(user);
    return {
        ...state,
        ...user
    }
})
.on(UploadAvatarFx.doneData, (state, res:{avatar: string}) => {
    return {
        ...state,
        avatar: res.avatar
    }
})