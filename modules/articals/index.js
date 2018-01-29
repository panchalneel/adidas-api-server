var express = require('express');
var _ = require('lodash');
module.exports = class WishlistController {
    constructor(app) {
        let router = express.Router();
        app.use('/api/v1', router);

        router.post('/wishlist', this.add);
        router.delete('/wishlist/:id', this.remove);
        router.get('/wishlist', this.list);

    }

    add(req, res) {
        logger.info("Add article to wishlist");
        let articalDetails = req.body;
        global.wishList[articalDetails.id] = articalDetails;
        global.counter += 1;
        res.status(200);
        res.send({status: "Success", "message": "Article added in wishlist"});
    }

    remove(req, res) {
        let id = parseInt(req.params.id);
        delete global.wishList[id];
        res.status(200);
        res.send({status: "Success", message: "Article removed from wishlist"});
    }

    list(req, res) {
        res.status(200);
        res.send({status: "Success", data: _.values(global.wishList)});
    }

};