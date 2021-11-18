import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import FlagProvider, {useFlag} from '@unleash/proxy-client-react';

const config = {
  url: 'http://localhost:3000/proxy',
  clientKey: 'proxy-secret',
  refreshInterval: 15,
  appName: 'app-teste',
  environment: 'dev',
  storageProvider: {
    save: (name, data) => AsyncStorage.setItem(name, JSON.stringify(data)),
    get: (name) => AsyncStorage.getItem(name),
  },
};

const App = () => (
  <FlagProvider config={config}>
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <MyComponent />
    </SafeAreaView>
  </FlagProvider>
);

const MyComponent = () => {
  const feature = 'app.nova-feature';
  const enabled = useFlag(feature);

  return (
    <>
      <Text style={{fontSize: 18}}>
        A feature <Text style={{fontStyle: 'italic'}}>{feature}</Text> está{' '}
      </Text>
      <Text style={{fontSize: 24}}>
        {enabled ? (
          <Text style={{color: 'green'}}>ligada</Text>
        ) : (
          <Text style={{color: 'red'}}>desligada</Text>
        )}
      </Text>
    </>
  );
};

export default App;
