"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCreateHandler = exports.productListHandler = exports.productUpdateHander = exports.productFindHandler = exports.productDeleteHander = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
// import { Product, ProductModel } from "./models/product";
var amor_products_1 = require("./modules/amor-products");
var productListHandler = function (request, response, next) {
    // // response.setHeader("Access-Control-Allow-Origin", "*");
    // response.charset = "utf-8";
    // response.set({
    // 	"content-type": "application/json",
    // });
    amor_products_1.AmorProductModel.find()
        .then(function (result) {
        response.status(200).json(result);
    })
        .catch(function (err) {
        response.status(200).json([]);
    });
    // response.status(200).json(products);
    // next();
};
exports.productListHandler = productListHandler;
var productCreateHandler = function (req, res, nxt) {
    var product = new amor_products_1.AmorProductModel({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        unit: req.body.unit,
    });
    product
        .save()
        .then(function (result) {
        res.status(200).json(result);
    })
        .catch(function (err) {
        res.status(200).json({
            status: "error",
            message: err,
        });
    });
    // res.status(200).json({});
    // nxt();
};
exports.productCreateHandler = productCreateHandler;
// handler requires :pid params
var productDeleteHander = function (req, res, _) {
    var id = req.params.pid;
    amor_products_1.AmorProductModel.findByIdAndDelete(id)
        .then(function (result) {
        res.status(200).json(result);
    })
        .catch(function (err) { return res.status(200).json(err); });
};
exports.productDeleteHander = productDeleteHander;
var productFindHandler = function (req, res, _) {
    var id = req.params.pid;
    amor_products_1.AmorProductModel.findById(id)
        .then(function (result) {
        if (!result)
            result = {};
        res.status(200).json(result);
    })
        .catch(function (err) {
        res.status(200).json({
            status: "error",
            message: err,
        });
    });
};
exports.productFindHandler = productFindHandler;
var productUpdateHander = function (req, res, _) {
    var id = req.params.pid;
    var updateFields = req.body;
    amor_products_1.AmorProductModel.findByIdAndUpdate(id, updateFields, {
        new: true,
        useFindAndModify: false,
    })
        .then(function (result) {
        res.status(200).json(result);
    })
        .catch(function (error) {
        res.status(200).json(error);
    });
    // // console.log(req.body);
    // // console.log(typeof req.body);
    // res.status(200).json({});
};
exports.productUpdateHander = productUpdateHander;
