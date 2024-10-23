export default () => ({
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    imageUploadFolder: process.env.IMAGE_UPLOAD_FOLDER,
    rmq: {
        url:
            process.env.NODE_ENV === "production"
                ? process.env.CLOUDAMQP_URL
                : process.env.RMQ_URL,
        queue: process.env.RMQ_QUEUE
    },
    ai: {
        geminiApiKey: process.env.GEMINI_API_KEY,
        geminiModel: process.env.GEMINI_MODEL,
        prompts: {
            baseDiseaseImage: process.env.BASE_DISEASE_IMAGE_PROMPT
        }
    }
});
