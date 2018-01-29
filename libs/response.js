/*
function Response(){
	this.handler     = function(){
		return function(req, res, next){
			var resp_handler        = new ResponseHandler(req, res);
			resp_handler.start_time = (new Date()).getTime();
			res.sendResponse        = resp_handler.sendResponse;
			res.sendError           = resp_handler.sendError;
			return next();
		};
	};
	this.authHandler = function(bypassed_paths){
		return function(req, res, next){
			next();
		};
	}
}

function ResponseHandler(req, resp){
	var response      = resp;
	this.path         = '';
	this.sendResponse = function(resp, not_send_no_records){
		if(Object.keys(resp).length > 0 || not_send_no_records){
			var str = Utils.unescape(JSON.stringify(resp));
			str     = str.replace(/&<[^>]*>/g, " ");
			str     = str.replace(/  /g, "");
			resp    = JSON.parse(str);
			response.send({
				Status:"success",
				Data:resp
			});
		}
		else{
			response.send({
				Status:"success",
				Data:resp,
				Message:'No records found'
			});
		}
		this.sendError = function(e){
			var err;
			if(e.http_code)
				response.status(e.http_code);
			else
				response.status(400);
			
			if(e instanceof Exception){
				err = e.getError();
			} else err = e;
			response.json({
				Status:"failure",
				Error:err
			});
		}
	}
}

module.exports = Response;*/
