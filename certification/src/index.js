import {
  Kafka,
  logLevel,
  CompressionTypes
} from 'kafkajs'

const kafka = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'certificate',
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10
  }
})

const topic = 'issue-certificate'
const consumer = kafka.consumer({
  groupId: 'certificate-group'
})

const producer = kafka.producer()

async function run() {
  await consumer.connect()
  await consumer.subscribe({
    topic
  })

  await consumer.run({
    eachMessage: async ({
      topic,
      partition,
      message
    }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`

      console.log(`- ${prefix} ${message.key}#${message.value}`)

      const payload = JSON.parse(message.value)

      producer.send({
        topic: 'certification-response',
        compression: CompressionTypes.GZIP,
        messages: [{
          value: JSON.stringify({
            message: `Certificado do usuário ${payload.user.name} do curso ${payload.course} gerado!`
          })
        }]
      })
    }
  })
}

run().catch(console.error)
