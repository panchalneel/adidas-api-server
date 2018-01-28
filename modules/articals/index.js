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
        console.log('Add to wishlist');
        //console.log(req.body);
        console.log("Before Wishlist");
        console.log(wishList);

        let articalDetails = req.body;

        global.wishList[articalDetails.id] = articalDetails;
        global.counter += 1;
        console.log("WishList : ");
        console.log(wishList);
        res.status(200);
        res.send({status: "Success", "message": "Product added in wishlist"});
    }

    remove(req, res) {
        let id = parseInt(req.params.id);
        console.log("Id : " + id);
        console.log('Remove to wishlist');

        delete global.wishList[id];
        console.log("WishList : ");
        console.log(wishList);
        res.status(200);
        res.send({status: "Success", message: "Product removed from wishlist"});
    }

    list(req, res) {
        console.log('List wishlist');
        res.status(200);
        res.send({status: "Success", data: _.values(global.wishList)});
    }

};