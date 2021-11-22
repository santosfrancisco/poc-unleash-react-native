import {useVariant} from '@unleash/proxy-client-react';
import React from 'react';
import {Text} from 'react-native';

function Variant({featureName}) {
  const variant = useVariant(featureName);
  return (
    <>
      <Text style={{fontSize: 18}}>
        A feature <Text style={{fontStyle: 'italic'}}>{featureName}</Text> está{' '}
      </Text>
      <Text style={{fontSize: 24}}>
        {variant.enabled ? (
          <Text style={{color: 'green'}}>ligada</Text>
        ) : (
          <Text style={{color: 'red'}}>desligada</Text>
        )}
      </Text>
      {variant.enabled && (
        <Text style={{fontSize: 18}}>
          E a variante é:{' '}
          <Text style={{color: 'blue'}}>{variant.payload.value}</Text>
        </Text>
      )}
    </>
  );
}

export default Variant;
