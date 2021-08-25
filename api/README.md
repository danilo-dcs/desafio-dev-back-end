<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
 

## Descrição

Repositório contendo o código fonte da API desenvolvida para o desafio back-end da Precato. Optou-se pela utilização do PostgreSQL como banco de dados, e do NestJs como framework para a criação da API. 

Antes de executar a API, é necessária a criação do banco de dados local "desafio_precato" e a configuração do arquivo de ambiente ".env" contido no diretório "api".

## Instalação

```bash
$ npm install
$ yarn install
```

## Executando o app

```bash
# development
$ npm run start
$ yarn run start

# watch mode
$ npm run start:dev
$ yarn run start:dev

# production mode
$ npm run start:prod
$ yarn run start:prod
```

## Requisições


<b>Post: </b>

```
localhost:3000/api/credor
#
localhost:3000/api/devedor
#
localhost:3000/api/pagamento
```

<b>Get All sem parâmetros: </b>

```
localhost:3000/api/credor
#
localhost:3000/api/devedor
#
localhost:3000/api/pagamento
```

<b>Get All com parâmetros: </b>

```
localhost:3000/api/credor?nomeCredor={nome do credor}&cpfCredor={cpf do credor}
#
localhost:3000/api/devedor?nomeEnteDevedor={nome do ente devedor}&cnpjEnteDevedor={cnpj do ente devedor}
#
localhost:3000/api/pagamento?valorInicial={valor inicial}&valorFinal={valor final} ... & ...
```

<b>Put/Delete/GetById: </b>
localhost:3000/api/credor/{id do credor}
#
localhost:3000/api/devedor/{id do devedor}
#
localhost:3000/api/pagamento/{id do pagamento}


## Corpo da Requisição

<b>Exemplo de corpo de requisição para a rota de POST/PUT do credor: </b>

```
{
    "nomeCredor": "nome",
    "cpfCredor": "123456789123",  # 11 caracteres
    "statusCadastro": "STATUS"    # Opcional, caso não informado, o valor padrão é "ATIVO"
}
```

<b>Exemplo de corpo de requisição para a rota de POST/PUT do devedor: </b>

```
{
    "nomeEnteDevedor": "nome",
    "cnpjEnteDevedor": "12345678912345"             # 14 caracteres
}
```

<b>Exemplo de corpo de requisição para a rota de POST/PUT do pagamento: </b>

```
{
    "idCredor": "d36e1c11-5444-4e58-a1cd-7b672f5c246a",               # string no formato uuid
    "idEnteDevedor": "ad4cd1c1-b232-4de2-abf1-927610a7b468",          # string no formato uuid
    "valorInicial": 5.00,                                             # numero maior que 0
    "valorFinal": 7.00,                                               # numero maior que 0
    "statusRemessa": "STATUS"                                         # Opcional                            
}
```


## Licensa

Nest is [MIT licensed](LICENSE).
