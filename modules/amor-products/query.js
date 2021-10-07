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
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryFields = exports.query = void 0;
var graphql_1 = require("graphql");
var models_1 = require("./models");
var types_1 = require("./types");
var queryFields = {};
exports.queryFields = queryFields;
queryFields.productAll = {
    type: graphql_1.GraphQLList(types_1.typeDef),
    resolve: function () { return models_1.model.find(); },
};
queryFields.productById = {
    type: types_1.typeDef,
    args: {
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
    },
    resolve: function (_, args) { return models_1.model.findById(args.id); },
};
exports.query = new graphql_1.GraphQLObjectType({
    name: "AmorProductQuery",
    description: "All query about product, for Amor-Bread.",
    fields: __assign({ products: {
            type: graphql_1.GraphQLList(types_1.typeDef),
            resolve: function () {
                return models_1.model.find();
            },
        }, product: {
            type: types_1.typeDef,
            args: {
                id: { type: graphql_1.GraphQLString },
            },
            resolve: function (_, args) { return models_1.model.findById(args.id); },
        } }, queryFields),
});
