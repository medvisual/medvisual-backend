export default () => ({
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    rmq: {
        url:
            process.env.NODE_ENV === "production"
                ? process.env.CLOUDAMQP_URL
                : process.env.RMQ_URL,
        queue: process.env.RMQ_QUEUE
    },
    database: {
        url: process.env.DATABASE_URL,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME
    }
});
