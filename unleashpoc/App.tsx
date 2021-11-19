import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FlagProvider, {
  useFlag,
  IConfig,
  useFlagsStatus,
  useUnleashContext,
} from '@unleash/proxy-client-react';

const CPF = Math.floor(Math.random() * 10);

const config: IConfig = {
  url: 'http://localhost:3000/proxy',
  clientKey: 'proxy-secret',
  refreshInterval: 15,
  appName: 'app-teste',
  environment: 'dev',
  storageProvider: {
    save: (name, data) => AsyncStorage.setItem(name, JSON.stringify(data)),
    get: async (name) => await AsyncStorage.getItem(name),
  },
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
  const featureRolout = 'app.rolout-feature';
  const featurePorCpf = 'app.feature-por-cpf';

  const enabled = useFlag(feature);
  const enabledRolout = useFlag(featureRolout);
  const enabledCPF = useFlag(featurePorCpf);

  const updateContext = useUnleashContext();

  const {flagsReady, flagsError} = useFlagsStatus();

  React.useEffect(() => {
    updateContext({userId: `${CPF}`});
  }, [flagsReady]);

  return (
    <View
      style={{alignItems: 'center', justifyContent: 'space-around', flex: 1}}>
      {flagsReady ? (
        <>
          <View>
            <Text style={{fontSize: 18}}>CPF do usuário logado: {CPF}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>
              A feature <Text style={{fontStyle: 'italic'}}>{feature}</Text>{' '}
              está{' '}
            </Text>
            <Text style={{fontSize: 24}}>
              {enabled ? (
                <Text style={{color: 'green'}}>ligada</Text>
              ) : (
                <Text style={{color: 'red'}}>desligada</Text>
              )}
            </Text>
            <Text style={{fontSize: 18}}>
              A feature{' '}
              <Text style={{fontStyle: 'italic'}}>{featurePorCpf}</Text> está{' '}
            </Text>
            <Text style={{fontSize: 24}}>
              {enabledCPF ? (
                <Text style={{color: 'green'}}>ligada</Text>
              ) : (
                <Text style={{color: 'red'}}>desligada</Text>
              )}
            </Text>
            <Text style={{fontSize: 18}}>
              A feature{' '}
              <Text style={{fontStyle: 'italic'}}>{featureRolout}</Text> está{' '}
            </Text>
            <Text style={{fontSize: 24}}>
              {enabledRolout ? (
                <Text style={{color: 'green'}}>ligada</Text>
              ) : (
                <Text style={{color: 'red'}}>desligada</Text>
              )}
            </Text>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default App;
