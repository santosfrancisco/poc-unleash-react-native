import React from 'react';
import {SafeAreaView, View, Text, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FlagProvider, {
  IConfig,
  useFlagsStatus,
  useUnleashContext,
} from '@unleash/proxy-client-react';

import {customClient} from './src/helpers/customFetch';

import Feature from './src/components/Feature';
import Variant from './src/components/Variant';

const CPF = Math.floor(Math.random() * 10);

const config: IConfig = {
  url: 'http://localhost:3000/proxy',
  clientKey: 'proxy-secret',
  refreshInterval: 15,
  appName: 'default',
  fetch: customClient,
  storageProvider: {
    save: (name, data) => AsyncStorage.setItem(name, JSON.stringify(data)),
    get: (name) => AsyncStorage.getItem(name),
  },
  bootstrap: [
    {
      name: 'app.nova-feature',
      enabled: true,
      variant: {
        name: 'variant',
      },
    },
  ],
};

const App = () => {
  return (
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
};

const MyComponent = () => {
  const feature = 'app.nova-feature';
  const featureRollout = 'app.rollout-feature';
  const featurePorCpf = 'app.feature-por-cpf';
  const featurePorPlataforma = 'app.por-plataforma';
  const featureComVariant = 'app.feature-com-variant';

  const updateContext = useUnleashContext();
  const {flagsReady, flagsError} = useFlagsStatus();

  React.useEffect(() => {
    updateContext({
      userId: `${CPF}`,
      properties: {platform: Platform.OS === 'ios' ? 'ios' : 'android'},
    });
  }, [flagsReady]);

  if (flagsError) {
    return (
      <View>
        <Text>{JSON.stringify(flagsError)}</Text>
      </View>
    );
  }

  return (
    <View
      style={{alignItems: 'center', justifyContent: 'space-around', flex: 1}}>
      {flagsReady ? (
        <>
          <View>
            <Text style={{fontSize: 18}}>CPF do usu??rio logado: {CPF}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Feature featureName={feature} />
            <Feature featureName={featurePorCpf} />
            <Feature featureName={featureRollout} />
            <Feature featureName={featurePorPlataforma} />
            <Variant featureName={featureComVariant} />
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default App;
