import { ClientContext } from 'graphql-hooks';
import { useGraphQLClient } from '../lib/graphql.client';
import '../styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

function MyApp({ Component, pageProps }) {
  const graphQLClient = useGraphQLClient();
  return (
    <CssBaseline>
      <Container maxWidth='lg'>
        <ClientContext.Provider value={graphQLClient}>
          <Component {...pageProps}></Component>
        </ClientContext.Provider>
      </Container>
    </CssBaseline>
  );
}

export default MyApp;
