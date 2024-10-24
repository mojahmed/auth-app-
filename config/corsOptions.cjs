const allowedOrigins = require("./allowedOrigins.cjs");
const corsOptions = {
    // origin: (origin,callback) => {
    //     if(allowedOrigins.indexOf(origin)!==-1 || !origin){  // i should remove this before depl
    //         callback(null,true)

    //     }else {
    //         callback(new Error("You Are Not Register"))//Not allowed by CORS
    //     }
    origin: (origin, callback) => {
        // Check if the origin is in the allowedOrigins array
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("You are not allowed by CORS"));
        }

    } ,
    credentials: true,
    optionsSuccessStatus: 200,

};
module.exports = corsOptions;