import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split} from "@apollo/client";
import {createClient} from "graphql-ws";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {getMainDefinition} from "@apollo/client/utilities";

export const queryClient = new HttpLink({
    uri: "http://localhost:8080/graphql"
});
export const webSocketClient = new GraphQLWsLink(createClient({
    url: "ws://localhost:8080/graphql"
}));
const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
        );
    },
    webSocketClient,
    queryClient
);
export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});
const ApolloAppProvider = ({children}) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export const STATIC_URL = "http://localhost:8080/";



export default ApolloAppProvider;