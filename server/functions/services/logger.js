const functions = require("firebase-functions");

const logger = (category, message) => {
    switch(category){
        case "error":
            return functions.logger.error(message);
        case "info":
            return functions.logger.info(message);
        case "debug":
            return functions.logger.debug(message);
        default:
            return functions.logger.log(message);
    }
}

module.exports = { log: logger }