const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'inventory-service', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'inventory-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'order_created', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const order = JSON.parse(message.value.toString());
      console.group('📦 Inventario: reservando para orden', order.id);
      console.log('🔍 Topic:', topic);
      console.log('🔍 Partition:', partition);
      console.log('🔍 Message:', message.value.toString());
      console.groupEnd();
    },
  });

  console.log('📡 Inventory Service escuchando eventos...');
};

run();
