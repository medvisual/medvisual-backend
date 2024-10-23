export default () => ({
    microservices: {
        imageHandler: {
            rmqUrl:
                process.env.NODE_ENV === "production"
                    ? process.env.CLOUDAMQP_URL
                    : process.env.RMQ_URL,
            rmqQueue: process.env.RMQ_IMAGE_HANDLER_QUEUE
        },
        diseases: {
            rmqUrl:
                process.env.NODE_ENV === "production"
                    ? process.env.CLOUDAMQP_URL
                    : process.env.RMQ_URL,
            rmqQueue: process.env.RMQ_DISEASES_QUEUE
        }
    }
});
