"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmorOrderDetailMutation = exports.AmorOrderDetailInputType = exports.AmorOrderDetailType = exports.AmorOrderDetailModel = void 0;
var graphql_1 = require("graphql");
var mongoose_1 = __importStar(require("mongoose"));
var amor_products_1 = require("./amor-products");
var schema = new mongoose_1.Schema({
    _id: String,
    order_id: String,
    product_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
    },
    product_price: Number,
    quantity: Number,
});
var model = mongoose_1.default.model("AmorOrderDetails", schema);
exports.AmorOrderDetailModel = model;
var typeDef = new graphql_1.GraphQLObjectType({
    name: "AmorOrderDetailType",
    fields: {
        order_id: { type: graphql_1.GraphQLID },
        product_id: { type: graphql_1.GraphQLString },
        product_price: { type: graphql_1.GraphQLInt },
        quantity: { type: graphql_1.GraphQLFloat },
        product: {
            type: amor_products_1.AmorProductType,
            resolve: function (parent) { return amor_products_1.AmorProductModel.findById(parent.product_id); },
        },
        subtotal: {
            type: graphql_1.GraphQLFloat,
            resolve: function (parent) { return parent.product_price * parent.quantity; },
        },
    },
});
exports.AmorOrderDetailType = typeDef;
var inputTypeDef = new graphql_1.GraphQLInputObjectType({
    name: "AmorOrderDetailInputType",
    fields: {
        order_id: { type: graphql_1.GraphQLString },
        product_id: { type: graphql_1.GraphQLString },
        product_price: { type: graphql_1.GraphQLInt },
        quantity: { type: graphql_1.GraphQLInt },
    },
});
exports.AmorOrderDetailInputType = inputTypeDef;
var mutation = new graphql_1.GraphQLObjectType({
    name: "AmorOrderDetailMutations",
    description: "Mutations for order details. All the mutations will require an order's ID.",
    fields: {},
});
exports.AmorOrderDetailMutation = mutation;
