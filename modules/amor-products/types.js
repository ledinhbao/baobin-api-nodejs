"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputTypeDef = exports.typeDef = void 0;
var graphql_1 = require("graphql");
exports.typeDef = new graphql_1.GraphQLObjectType({
    name: "AmorProductType",
    fields: {
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: graphql_1.GraphQLString },
        unit: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
        image_url: { type: graphql_1.GraphQLString },
        external_image: { type: graphql_1.GraphQLBoolean },
    },
});
exports.inputTypeDef = new graphql_1.GraphQLInputObjectType({
    name: "AmorProductInputType",
    fields: {
        name: { type: graphql_1.GraphQLString },
        unit: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
        image_url: { type: graphql_1.GraphQLString },
        external_image: { type: graphql_1.GraphQLBoolean },
    },
});
