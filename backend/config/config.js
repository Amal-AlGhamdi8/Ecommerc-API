import "dotenv/config";

export const dev = {
    app: {
        port : process.env.PORT,
        url : process.env.APP_API_URL
    } ,
    db: {},
};