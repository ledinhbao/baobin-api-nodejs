"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = exports.mutationFields = void 0;
var graphql_1 = require("graphql");
var mongoose_1 = __importDefault(require("mongoose"));
var models_1 = require("./models");
var types_1 = require("./types");
exports.mutationFields = {};
exports.mutationFields.productCreate = {
    type: types_1.typeDef,
    args: {
        name: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
        unit: { type: graphql_1.GraphQLString },
        image_url: { type: graphql_1.GraphQLString },
        external_image: { type: graphql_1.GraphQLBoolean },
    },
    resolve: function (_, args) {
        var product = new models_1.model({
            _id: mongoose_1.default.Types.ObjectId(),
            name: args.name,
            price: args.price,
            unit: args.unit,
            image_url: args.image_url ? args.image_url : "",
            external_image: args.external_image ? args.external_image : false,
        });
        return product.save().then(function (result) { return result; });
    },
};
exports.mutationFields.productCreateWithObject = {
    type: types_1.typeDef,
    args: {
        fields: { type: types_1.inputTypeDef },
    },
    resolve: function (_, args) {
        // args.id = mongoose.Types.ObjectId();
        var product = new models_1.model(__assign({ _id: mongoose_1.default.Types.ObjectId() }, args.fields));
        return product.save().then(function (result) { return result; });
    },
};
exports.mutationFields.productUpdate2 = {
    type: types_1.typeDef,
    args: {
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        name: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
        unit: { type: graphql_1.GraphQLString },
        image_url: { type: graphql_1.GraphQLString },
        external_image: { type: graphql_1.GraphQLBoolean },
    },
    resolve: function (_, args) {
        var id = args.id;
        delete args.id;
        return models_1.model
            .findByIdAndUpdate(id, args, {
            new: true,
            useFindAndModify: false,
        })
            .then(function (result) {
            return result;
        });
    },
};
exports.mutationFields.productUpdate = {
    type: types_1.typeDef,
    args: {
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        updates: { type: types_1.inputTypeDef },
    },
    resolve: function (_, args) {
        return models_1.model
            .findByIdAndUpdate(args.id, args.updates, {
            new: true,
            useFindAndModify: false,
        })
            .then(function (result) {
            return result;
        });
    },
};
exports.mutation = new graphql_1.GraphQLObjectType({
    name: "AmorProductMutation",
    fields: __assign({}, exports.mutationFields),
});
