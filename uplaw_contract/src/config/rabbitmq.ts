import amqp from 'amqplib';

const QUEUE_NAME = 'emailQueue';

// handel connect amqp
export async function connectRabitmq() {
    try {
        const connect = await amqp.connect('amqp://localhost')
        const chanel = await connect.createChannel();
        await chanel.assertQueue(QUEUE_NAME);
        return chanel
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}