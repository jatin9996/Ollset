import {
    ApolloClient,
    InMemoryCache,
    gql,
    createHttpLink
  } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { LIFERAY_ID, LIFERAY_SECRET_CLIENT } from '../../_constants/constants';
import { getStore } from '../../_utils';

export const GQL = gql;

const httpLink = createHttpLink({
  uri: 'http://18.222.211.166:8080/o/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const userToken = localStorage.getItem('user') === undefined || localStorage.getItem('user') === null ? "" : JSON.parse(localStorage.getItem('user')).access_token;
  // return the headers to the context so httpLink can read them
  if(userToken !== "") {
    return {
      headers: {
        ...headers,
        Authorization: userToken ? `Bearer ${userToken}` : "",
      }
    }
  } else {
    return {
      headers: {
        ...headers
      }
    }
  }
});


export const AClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false
  }),
  awaitRefetchQueries : true
});
console.log(AClient);
export const AClientHeaders = {
    liferayClientId: LIFERAY_ID,
    liferayClientSecret: LIFERAY_SECRET_CLIENT
}

