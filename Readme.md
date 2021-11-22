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
cd app
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

## Rodando uma instancia local do unleash com o Node

Caso queira testar com um servidor Unleash local usando Node ao invés do Heroku, siga os passo abaixo

> Aqui usaremos o docker para criar o Postgres

1. Execute `docker run --name unleash-postgres -e POSTGRES_PASSWORD=some_password -e POSTGRES_USER=unleash_user -e POSTGRES_DB=unleash -d -p 5432:5432 postgres` para iniciar o Postgres
2. No diretório `/server` execute `node server.js`
3. Abra [`https://localhost:4242`](https://localhost:4242)
4. Acesse com as credenciais abaixo

```
user       admin
password   unleash4all
```

5. Crie uma nova feature
6. Crie uma API key
7. Atualize o `.env` do proxy e execute-o

## Rodando uma instancia local do unleash com o docker

Caso queira testar com um servidor Unleash local usando Docker ao invés do criado no Heroku, siga os passos abaixo.

1. Execute `docker compose up -d`
2. Abra [`https://localhost:4242`](https://localhost:4242)
3. Acesse com as credenciais abaixo

```
user       admin
password   unleash4all
```

4. Crie uma nova feature
5. Crie uma API key
6. Atualize no docker-compose.yml o valor da variável `UNLEASH_API_TOKEN` com a api key gerada
7. Pare docker-compose e execute novamente executando `docker-compose down` e depois `docker compose up -d`
