import {useFlag} from '@unleash/proxy-client-react';
import React from 'react';
import {Text} from 'react-native';

function Feature({featureName}) {
  const enabled = useFlag(featureName);
  return (
    <>
      <Text style={{fontSize: 18}}>
        A feature <Text style={{fontStyle: 'italic'}}>{featureName}</Text> está{' '}
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
}

export default Feature;
