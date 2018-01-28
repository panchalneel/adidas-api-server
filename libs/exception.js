/*
 Author: Dipesh Patel
 Created On: 14-Aug-2013
 
 This is the Exception class, used to raise the exception, it also logs the exception.
 */

let util = require('util');
let Logger = require('./logger');
let logger = new Logger();
let EXCEPTION_MESSAGES = null;
module.exports = function (exceptions) {
    EXCEPTION_MESSAGES = exceptions;
    function Exception(error_name, params, root_error) {
        Error.captureStackTrace(this, Exception);
        this.error_name = error_name;
        this.params = params;

        if(this.params === "Not Found"){
            this.params="NotFound"
        }
        this.code = EXCEPTION_MESSAGES[error_name]['code'];
        this.http_code = EXCEPTION_MESSAGES[error_name]['http_code'];
        this.error_message = EXCEPTION_MESSAGES[error_name]['message'];
        if (params !== undefined && params !== null && typeof params !== "string") {
            for (let key in params) {
                let regExp = new RegExp("{" + key + "}", 'g');
                this.error_message = this.error_message.replace(regExp, params[key]);
            }
        } else if (params != undefined) {
            this.error_message = params;
        }

        //this.stack_trace = this.stack;
        if (root_error != undefined) this.root_error = root_error;
        if (EXCEPTION_MESSAGES[error_name]['send_notification'] == "true" || EXCEPTION_MESSAGES[error_name]['send_notification'] == true)
            logger.error(this);

        this.getError = function () {
            return {
                'Code': this.code,
                'Name': this.error_name,
                'Message': this.error_message
            };
        }
    }

    util.inherits(Exception, Error);
    return Exception;
};
