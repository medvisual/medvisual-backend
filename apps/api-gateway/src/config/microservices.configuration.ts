export default () => ({
    microservices: {
        imageHandler: {
            host: process.env.IMAGE_HANDLER_HOST,
            port: parseInt(process.env.IMAGE_HANDLER_PORT, 10)
        }
    }
});
