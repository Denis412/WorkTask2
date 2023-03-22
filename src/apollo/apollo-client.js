import { getClientOptions } from "src/apollo";
import { ApolloClient } from "@apollo/client/core";

const options = getClientOptions();
const apolloClient = new ApolloClient(options);

export default apolloClient;
