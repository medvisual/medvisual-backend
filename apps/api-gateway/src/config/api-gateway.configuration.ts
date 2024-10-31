export default () => ({
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    imageUploadFolder: process.env.IMAGE_UPLOAD_FOLDER,
    jwt: {
        access: {
            secret: process.env.JWT_ACCESS_SECRET
        },
        refresh: {
            secret: process.env.JWT_REFRESH_SECRET
        }
    }
});
