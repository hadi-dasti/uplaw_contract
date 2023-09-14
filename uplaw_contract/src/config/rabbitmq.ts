import amqp from 'amqplib';

// ';

// handel connect amqp
export async function connectRabitmq() {
    try {
        const connect = await amqp.connect("amqp://localhost:5672")
        const chanel = await connect.createChannel();
        // const build_chanel = await chanel.assertQueue(QUEUE_NAME,{durable:false});
        // console.log(build_chanel)
        return chanel
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}