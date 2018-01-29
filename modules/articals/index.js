var express = require('express');
var _ = require('lodash');
/**
 * @author Nil Panchal
 * @desc Class to handel wishlist operations
 * @type {module.WishlistController}
 */
module.exports = class WishlistController {
    constructor(app) {
        let router = express.Router();

        // API Version
        app.use('/api/v1', router);

        router.post('/wishlist', this.add);
        router.delete('/wishlist/:id', this.remove);
        router.get('/wishlist', this.list);

        // External route
        app.get('/coverage', function(req, res, next) {
            res.render('coverage/lcov-report/index', { title: 'Express' });
        });

    }

    /**
     * @description To add item in wish list
     * @param req
     * @param res
     */
    add(req, res) {
        logger.info("Add article to wishlist");
        let articalDetails = req.body;
        global.wishList[articalDetails.id] = articalDetails;
        global.counter += 1;
        res.status(200);
        res.send({status: "Success", "message": "Article added in wishlist"});
    }

    /**
     * @description To remove item from wish list
     * @param req
     * @param res
     */
    remove(req, res) {
        let id = parseInt(req.params.id);
        delete global.wishList[id];
        res.status(200);
        res.send({status: "Success", message: "Article removed from wishlist"});
    }

    /**
     * @description To get wish list
     * @param req
     * @param res
     */
    list(req, res) {
        res.status(200);
        res.send({status: "Success", data: _.values(global.wishList)});
    }

};