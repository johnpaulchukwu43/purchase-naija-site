const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    paystackKey:process.env.PAYSTACK_KEY,
    proxyToApi:process.env.PROXY_TO_API,
    nodeEnv:process.env.NODE_ENV,
};
