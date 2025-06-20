const express = require('express');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'order-service', brokers: ['localhost:9092'] });
const producer = kafka.producer();

const app = express();
app.use(express.json());

app.post('/orders', async (req, res) => {
  const order = { id: Date.now(), ...req.body };

  await producer.connect();
  await producer.send({
    topic: 'order_created',
    messages: [{ value: JSON.stringify(order) }],
  });

  await producer.disconnect();

  console.log('🟢 Orden creada:', order);
  res.status(201).send({ message: 'Orden enviada', order });
});

app.listen(3000, () => {
  console.log('🚀 Order Service escuchando en puerto 3000');
});
