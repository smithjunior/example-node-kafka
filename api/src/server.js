import express from 'express'
import {
  Kafka,
  logLevel
} from 'kafkajs'
import routes from './routes'

/**
 * Instância do express
 */
const app = express()

/**
 * Definições do Kafka para conexão
 */
const kafka = new Kafka({
  clientId: 'api',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10
  }
})

const topic = 'certification-response'
const consumer = kafka.consumer({
  groupId: 'certificate-group-receiver'
})

/**
 * Criando um producer
 */
const producer = kafka.producer()

/**
 * Adicionado producer para todas as rotas,
 * utilizando uma middleware
 */
app.use((request, response, next) => {
  request.producer = producer
  request.consumer = consumer

  return next()
})

/**
 * Cadastrando todas as rotas importadas do arquivo routes.js
 */
app.use(routes)

async function run() {
  await producer.connect()
  await consumer.connect()

  await consumer.subscribe({
    topic
  })

  app.listen(3333)
}

run().catch(console.error)
