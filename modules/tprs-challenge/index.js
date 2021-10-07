"use strict";
// export { typeDefs as TPRsSchemas } from "./schemas";
// export { resolvers as TPRsResolvers } from "./resolvers";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPRsSchema = void 0;
var schema_1 = require("@graphql-tools/schema");
var resolvers_1 = require("./resolvers");
var schemas_1 = require("./schemas");
var schema = schema_1.makeExecutableSchema({
    typeDefs: schemas_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
exports.TPRsSchema = schema;
