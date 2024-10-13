const allowedOrigins = require("./allowedOrigins");
const corsOptions = {
    origin: (origin,callback) => {
        if(allowedOrigins.indexOf(origin)!==-1 || !origin){  // i should remove this before depl
            callback(null,true)

        }else {
            callback(new Error("You Are Not Register"))//Not allowed by CORS
        }

    } ,
    Credentials: true,
    optionsSuccessStatus: 200,

};
module.exports = corsOptions;