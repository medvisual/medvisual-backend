export default () => {
    const isProduction: boolean = process.env.NODE_ENV === "production";

    return {
        microservices: {
            imageHandler: {
                rmqUrl: isProduction
                    ? process.env.CLOUDAMQP_URL
                    : process.env.RMQ_URL,
                rmqQueue: process.env.RMQ_IMAGE_HANDLER_QUEUE
            }
        }
    };
};
