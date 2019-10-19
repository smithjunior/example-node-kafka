# Microserviço com NodeJS

Criação de uma estrutura base orientada a eventos(Event-Driven Development).

- NodeJS
- Kafka
- [KafkaJS](https://kafka.js.org/)


## Aplicações

- API Principal
- Geração de certificado

## Fluxo

- API principal envia uma mensagem pro serviço de certificado para gerar o certificado
- Microserviço de certificado devolve uma resposta (Sícrona/Assícrona)

Se conseguir sícrona/assícrona:

- Receber uma respota assícrona de quando o e-mail com o certificado foi enviado

## O que sabemos

- REST (latência)
- REDIS / RabbitMQ/ **Kafka**

Empresas que utilizam kafka.

- Nubank, Uber, Paypal, Netflix

## Running 

### Apache Kafka in Docker

```bash
$ docker-compose up -d
```

### Api microservice

```bash
$ cd api
$ yarn install
$ yarn Dev
```

### Certification microservice

```bash
$ cd certification
$ yarn install
$ yarn Dev
```

## Testing application

> Send a post http method to http://localhost:3333/certifications

## FrameworksProgressive microservices framework for Node.js

- [Micro](https://github.com/zeit/micro)
- [Moleculer](https://moleculer.services/)
