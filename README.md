# 🧾 Event-Driven Order System with Kafka and Node.js

This project is a simple example of building a distributed, event-driven microservice architecture using **Apache Kafka** and **Node.js**. It demonstrates how services communicate using events, how to structure them, and how to monitor the flow using real-world practices.

---

## 🚀 Overview

We create two basic services:

1. **Order Service**

   - Exposes a `POST /orders` endpoint
   - Publishes an `order_created` event to **Kafka**.

2. **Inventory Service**

   - Listens to the `order_created` event
   - Simulates reserving stock

---

## 🧱 Technologies Used

- Node.js (with [kafkajs](https://github.com/tulios/kafkajs))
- Docker & Docker Compose

---

## ⚙️ Getting Started

### 1. Install Docker

Ensure [Docker](https://docs.docker.com/compose/install/) is installed and running on your machine.

### 2. Clone the repository

```bash
git clone https://github.com/your-username/kafka-nodejs-order-system.git
cd kafka-nodejs-order-system
```

### 3. Start Kafka using Docker Compose

```bash
docker compose up -d
```

This starts:

- Kafka Broker

### 4. Start the Services

#### Terminal 1: Order Service

```bash
cd order-service
npm install
node index.js
```

#### Terminal 2: Inventory Service

```bash
cd inventory-service
npm install
node index.js
```

### 5. Test the System

Use `curl` or Postman to send an order:

```bash
curl -X POST http://localhost:3000/orders \
-H "Content-Type: application/json" \
-d '{"userId":"julian","items":["item1","item2"]}'
```

You should see logs in both services/terminals:

- `Order Service` confirms the event was published
- `Inventory Service` processes the event

---

## 🧪 Monitoring Kafka

### CLI (basic)

```bash
# Stream messages
kcat -b localhost:9092 -t order_created -C
```

---

## 📚 Concepts Learned

- Event-driven communication using Kafka
- Microservice decoupling
- Kafka topics, producers, and consumers
- Understanding consumer lag and message offsets
- Monitoring Kafka with CLI and UI tools

---

## 🙌 Credits

This project was built as a hands-on learning exercise to understand real-world Kafka usage in microservices. Inspired by best practices from production systems.

Made with ❤️ by [Julian](https://github.com/juliandavidmr)

---

## 📌 License

MIT
