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
    },
    jwt: {
        access: {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresInSeconds: process.env.JWT_ACCESS_EXPIRES_IN_SECONDS
        },
        refresh: {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresInSeconds: process.env.JWT_REFRESH_EXPIRES_IN_SECONDS
        }
    },
    microservices: {
        users: {
            rmqUrl:
                process.env.NODE_ENV === "production"
                    ? process.env.CLOUDAMQP_URL
                    : process.env.RMQ_URL,
            rmqQueue: process.env.RMQ_USERS_QUEUE
        }
    }
});
