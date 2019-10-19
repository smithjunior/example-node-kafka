import express from 'express'
import {
  CompressionTypes
} from 'kafkajs'

const routes = express.Router()

routes.post('/certifications', async (request, response) => {
  // Chamar micro serviço
  const {
    producer
  } = request

  const message = {
    user: {
      id: 1,
      name: 'Smith Júnior'
    },
    course: 'Kafka com Node.js',
    grade: 10
  }

  await producer.send({
    topic: 'issue-certificate',
    compression: CompressionTypes.GZIP,
    messages: [{
      value: JSON.stringify(message)
    }]
  })

  const {
    consumer
  } = request

  await consumer.run({
    eachMessage: async ({
      topic,
      partition,
      message
    }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`

      console.log(`- ${prefix} ${message.key}#${message.value}`)

      return response.json({
        ok: JSON.parse(message.value)
      })
    }
  })

})

export default routes
