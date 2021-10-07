"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var productSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    name: String,
    price: Number,
    unit: String,
});
var ProductModel = mongoose_1.default.model("Product", productSchema);
exports.ProductModel = ProductModel;
