import React from 'react';
import Tabs from './components/Tabs/Tabs';
import theme from './components/theme';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {ThemeProvider} from '@mui/material/styles';

const client = new ApolloClient({
    uri: 'http://localhost:3003/graphql',
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Tabs/>
            </ThemeProvider>
        </ApolloProvider>
    );
}
export default App;
