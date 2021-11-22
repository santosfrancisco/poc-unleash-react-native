# Servidor Unleash usando Node + Postgres

## Rodar o Postgres no docker

```
  docker run --name unleash-postgres -e POSTGRES_PASSWORD=some_password -e POSTGRES_USER=unleash_user -e POSTGRES_DB=unleash -d -p 5432:5432 postgres
```

## Rodar o servidor node

```
  node server.js
```

O Unleash ficará disponível e [http://localhost:4242](http://localhost:4242)

login: admin
senha: unleash4all
