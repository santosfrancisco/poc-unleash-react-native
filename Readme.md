# POC Unleash React Native App

Poc para viabilizar o uso do unleash como gerenciador de feature flags em aplicativos React-native.

O servidor unleash desta poc foi criado na versão free usando o Heroku seguindo a [documentação do Unleash](https://docs.getunleash.io/)

```
link: https://unleash-poc.herokuapp.com/login
user: admin
password: unleash4all
```

O app foi criado usando o React-native na versão 0.63.4.

O proxy usa o [@unleash/proxy](https://www.npmjs.com/package/@unleash/proxy)

O SDK para integrar o app com o Unleash é o [@unleash/proxy-client-react](https://github.com/Unleash/proxy-client-react)

# Testando tudo integrado

Inicie a aplicação React-native

```
cd unleashpoc
yarn install
yarn android ou yarn ios
```

Inicie o servidor proxy do unleash

> Antes de iniciar o proxy, renomeie o arquivo `.env-example` para `.env` e adicione a `api-key`

```
cd proxy
yarn install
yarn start
```

## Rodando uma instancia local do unleash com o docker

Caso queira testar com um servidor Unleash local ao invés do criado no Heroku, siga os passos abaixo.

1. `docker compose up -d`
2. Abra [`https://localhost:4242`](https://localhost:4242)
3. Acesse com as credenciais abaixo

```
user       admin
password   unleash4all
```

4. Crie uma nova feature
5. Crie uma API key
6. Atualize no docker-compose.yml o valor da variável `UNLEASH_API_TOKEN` com a api key gerada
