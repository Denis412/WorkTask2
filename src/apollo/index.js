import { createHttpLink, InMemoryCache, split } from "@apollo/client/core";
import { getMainDefinition } from "apollo-utilities";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";

export function getClientOptions(options) {
  // const token = sessionStorage.getItem("token");

  const httpLink = createHttpLink({
    uri: "https://knowing-pegasus-94.hasura.app/v1/graphql",
    // headers: {
    //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    // },
  });

  const wsLink = new WebSocketLink({
    uri: "wss://knowing-pegasus-94.hasura.app/v1/graphql",
    options: {
      // reconnect: true,
      // connectionParams: {
      //   headers: {
      //     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      //   },
      // },
    },
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
  );

  return Object.assign(
    {
      link: link,
      cache: new InMemoryCache(),
      connectToDevTools: true,
    },
    // Specific Quasar mode options.
    process.env.MODE === "spa"
      ? {
          //
        }
      : {},
    process.env.MODE === "ssr"
      ? {
          //
        }
      : {},
    process.env.MODE === "pwa"
      ? {
          //
        }
      : {},
    process.env.MODE === "bex"
      ? {
          //
        }
      : {},
    process.env.MODE === "cordova"
      ? {
          //
        }
      : {},
    process.env.MODE === "capacitor"
      ? {
          //
        }
      : {},
    process.env.MODE === "electron"
      ? {
          //
        }
      : {},
    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},
    // For ssr mode, when on server.
    process.env.MODE === "ssr" && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === "ssr" && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {}
  );
}
