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
exports.ForexResolvers = exports.ForexSchema = void 0;
var mongoose_1 = require("mongoose");
var graphql_1 = require("graphql");
var model_1 = require("./model");
var schema = graphql_1.buildSchema("\n   type Pair {\n      id: ID\n      name: String\n      value: Float\n      float: Int\n   }\n\n   type Query {\n      forex_getPairs: [Pair]\n   }\n\n   input PairInput {\n      name: String!,\n      value: Float!,\n      float: Int!\n   }\n\n   type Mutation {\n      forex_createPair(data: PairInput): Pair\n   }\n");
exports.ForexSchema = schema;
var resolvers = {
    forex_getPairs: function () { return model_1.model.find(); },
    forex_createPair: function (args) {
        console.log(args);
        var pair = new model_1.model(__assign({ _id: mongoose_1.Types.ObjectId() }, args.data));
        return pair.save().then(function (res) { return res; });
    },
};
exports.ForexResolvers = resolvers;
