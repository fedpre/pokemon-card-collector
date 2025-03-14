import React, {JSX} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './src/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const client = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={client}>
      <GestureHandlerRootView>
        <Navigation />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
