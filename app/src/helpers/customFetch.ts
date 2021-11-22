export function customClient(endpoint: string, customConfig: any) {
  const config = {
    method: 'GET',
    ...customConfig,
    headers: {...customConfig.headers, ['x-app-token']: 'token-oaf'},
  };

  return fetch(`${endpoint}`, config);
}
